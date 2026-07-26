import { PrismaClient } from '@prisma/client';

export async function seedRewards(prisma: PrismaClient) {
  console.log('Seeding Achievements and Titles...');

  // === ACHIEVEMENTS ===
  const achievements = [
    { slug: 'first_blood', name: 'Primera Sangre', description: 'Completa tu primera lección.', icon: 'DROP', xpReward: 50, crystalReward: 10 },
    { slug: 'marathon_runner', name: 'Corredor de Maratón', description: 'Consigue una racha de 7 días.', icon: 'FIRE', xpReward: 200, crystalReward: 50 },
    { slug: 'pet_lover', name: 'Amante de las Mascotas', description: 'Lleva una mascota al nivel 10.', icon: 'PET', xpReward: 300, crystalReward: 100 },
    { slug: 'polyglot', name: 'Políglota', description: 'Completa al menos 1 lección en 3 lenguajes distintos.', icon: 'GLOBE', xpReward: 400, crystalReward: 150 },
    { slug: 'perfectionist', name: 'Perfeccionista', description: 'Completa 10 lecciones sin fallar.', icon: 'STAR', xpReward: 500, crystalReward: 200 },
    { slug: 'hacker_init', name: 'Iniciado', description: 'Crea tu cuenta en CodeNexus.', icon: 'COMPUTER', xpReward: 10, crystalReward: 5 },
    { slug: 'bug_squasher', name: 'Aplastador de Bugs', description: 'Completa 5 misiones de Debugging (BOSS).', icon: 'BUG', xpReward: 300, crystalReward: 100 }
  ];

  for (const ach of achievements) {
    const existing = await prisma.achievement.findUnique({ where: { slug: ach.slug } });
    if (!existing) {
      await prisma.achievement.create({ data: ach });
    }
  }

  // === TITLES ===
  const titles = [
    { name: 'Novato', description: 'Recién llegado al Nexo.' },
    { name: 'Aprendiz', description: 'Dando los primeros pasos en el código.' },
    { name: 'Codificador', description: 'Capaz de escribir scripts funcionales.' },
    { name: 'Desarrollador', description: 'Maestro de la lógica y los algoritmos.' },
    { name: 'Arquitecto de Software', description: 'Constructor de sistemas complejos.' },
    { name: 'Leyenda del Nexo', description: 'Dominio absoluto de todos los lenguajes.' },
    { name: 'Amigo de las Bestias', description: 'Cuidador experto de mascotas virtuales.' }
  ];

  for (const title of titles) {
    const existing = await prisma.title.findFirst({ where: { name: title.name } });
    if (!existing) {
      await prisma.title.create({ data: title });
    }
  }

  console.log(`Successfully seeded ${achievements.length} Achievements and ${titles.length} Titles.`);
}
