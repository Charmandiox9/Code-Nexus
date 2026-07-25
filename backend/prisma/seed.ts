import { PrismaClient } from '@prisma/client';
import { getPythonSeed } from './seeds/python';
import { getJavascriptSeed } from './seeds/javascript';
import { getTypescriptSeed } from './seeds/typescript';
import { getRustSeed } from './seeds/rust';
import { getCSeed } from './seeds/c';
import { getCppSeed } from './seeds/cpp';
import { getJavaSeed } from './seeds/java';
import { getSqlSeed } from './seeds/sql';
import { LanguageSeed } from './seeds/types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la superpoblación de la base de datos CodeNexus...');

  // Limpiar datos existentes de lecciones, conceptos y lenguajes para no duplicar
  console.log('🧹 Limpiando lecciones y conceptos anteriores...');
  await prisma.lesson.deleteMany({});
  await prisma.concept.deleteMany({});
  await prisma.language.deleteMany({});

  const seeders = [
    getPythonSeed,
    getJavascriptSeed,
    getTypescriptSeed,
    getRustSeed,
    getCSeed,
    getCppSeed,
    getJavaSeed,
    getSqlSeed,
  ];

  for (const seeder of seeders) {
    try {
      const langData: LanguageSeed = await seeder(prisma);
      console.log(`\n🚀 Poblando lenguaje: ${langData.name}...`);

      // 1. Crear Lenguaje
      const language = await prisma.language.create({
        data: {
          slug: langData.slug,
          name: langData.name,
          version: langData.version,
        },
      });

      let totalLessons = 0;

      // 2. Iterar por cada sección (Concepto)
      for (const section of langData.sections) {
        // Crear el concepto
        const concept = await prisma.concept.create({
          data: {
            slug: `${langData.slug}-${section.concept.slug}`,
            title: section.concept.title,
            description: section.concept.description,
            orderIndex: section.concept.orderIndex,
          },
        });

        // 3. Crear las lecciones y misiones para este concepto
        for (const lesson of section.lessons) {
          await prisma.lesson.create({
            data: {
              conceptId: concept.id,
              languageId: language.id,
              title: lesson.title,
              type: lesson.type,
              xpReward: lesson.xpReward,
              // Prisma expects a valid JSON input
              content: lesson.content as any,
            },
          });
          totalLessons++;
        }
      }
      console.log(`✅ ${langData.name} completado. Total de lecciones/misiones: ${totalLessons}`);
    } catch (e) {
      console.error(`⚠️ Error al ejecutar un seeder o puede que aún no esté implementado:`, e);
    }
  }

  console.log('\n🎉 ¡Superpoblación de la base de datos completada con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
