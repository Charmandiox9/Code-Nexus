import { PrismaClient } from '@prisma/client';

export async function seedDailyQuests(prisma: PrismaClient) {
  console.log('Seeding Daily Quests...');

  const questsData = [
    // === Login Quests ===
    { title: '¡Presente!', description: 'Inicia sesión en la plataforma.', xpReward: 10, crystals: 5, target: 1, actionType: 'LOGIN' },
    { title: 'Dedicación Matutina', description: 'Entra a CodeNexus y empieza tu día.', xpReward: 20, crystals: 10, target: 1, actionType: 'LOGIN' },
    { title: 'Búho Nocturno', description: 'Inicia sesión en la noche.', xpReward: 20, crystals: 10, target: 1, actionType: 'LOGIN' },
    { title: 'Constancia', description: 'Inicia sesión en la plataforma.', xpReward: 15, crystals: 5, target: 1, actionType: 'LOGIN' },
    { title: 'Un nuevo amanecer', description: 'Accede al sistema.', xpReward: 10, crystals: 5, target: 1, actionType: 'LOGIN' },

    // === Lesson Completion Quests ===
    { title: 'Calentamiento de Código', description: 'Completa 1 lección.', xpReward: 50, crystals: 15, target: 1, actionType: 'LESSON_COMPLETED' },
    { title: 'Racha de Aprendizaje', description: 'Completa 3 lecciones.', xpReward: 150, crystals: 40, target: 3, actionType: 'LESSON_COMPLETED' },
    { title: 'Maratón de Código', description: 'Completa 5 lecciones de corrido.', xpReward: 300, crystals: 80, target: 5, actionType: 'LESSON_COMPLETED' },
    { title: 'Hambre de Conocimiento', description: 'Completa 10 lecciones el día de hoy.', xpReward: 600, crystals: 150, target: 10, actionType: 'LESSON_COMPLETED' },
    { title: 'Paso a Paso', description: 'Completa 2 lecciones.', xpReward: 100, crystals: 20, target: 2, actionType: 'LESSON_COMPLETED' },
    { title: 'Estudiante Modelo', description: 'Completa 4 lecciones.', xpReward: 200, crystals: 50, target: 4, actionType: 'LESSON_COMPLETED' },
    { title: 'Sin Descanso', description: 'Completa 6 lecciones.', xpReward: 350, crystals: 90, target: 6, actionType: 'LESSON_COMPLETED' },
    { title: 'Máquina de Aprender', description: 'Completa 8 lecciones.', xpReward: 450, crystals: 120, target: 8, actionType: 'LESSON_COMPLETED' },
    { title: 'Mente Brillante', description: 'Completa 12 lecciones.', xpReward: 800, crystals: 200, target: 12, actionType: 'LESSON_COMPLETED' },
    { title: 'Explorador Sintáctico', description: 'Completa 4 lecciones.', xpReward: 200, crystals: 50, target: 4, actionType: 'LESSON_COMPLETED' },

    // === Pet Interaction Quests (Feed) ===
    { title: 'Dueño Responsable', description: 'Alimenta a tu mascota virtual 1 vez.', xpReward: 20, crystals: 10, target: 1, actionType: 'PET_FED' },
    { title: 'Banquete Virtual', description: 'Alimenta a tu mascota 3 veces hoy.', xpReward: 50, crystals: 25, target: 3, actionType: 'PET_FED' },
    { title: 'Chef de Código', description: 'Alimenta a tu mascota 5 veces.', xpReward: 100, crystals: 50, target: 5, actionType: 'PET_FED' },
    { title: 'Nutrición Digital', description: 'Alimenta a tu mascota 2 veces.', xpReward: 35, crystals: 15, target: 2, actionType: 'PET_FED' },
    { title: 'Mascota Satisfecha', description: 'Alimenta a tu mascota 4 veces.', xpReward: 75, crystals: 35, target: 4, actionType: 'PET_FED' },
    { title: 'Glotón de Datos', description: 'Alimenta a tu mascota 6 veces.', xpReward: 120, crystals: 60, target: 6, actionType: 'PET_FED' },

    // === Pet Interaction Quests (Play) ===
    { title: 'Tiempo de Juego', description: 'Juega con tu mascota virtual 1 vez.', xpReward: 30, crystals: 15, target: 1, actionType: 'PET_PLAYED' },
    { title: 'Diversión Sin Fin', description: 'Juega con tu mascota 5 veces hoy.', xpReward: 100, crystals: 50, target: 5, actionType: 'PET_PLAYED' },
    { title: 'Compañeros de Aventuras', description: 'Juega con tu mascota 3 veces.', xpReward: 60, crystals: 30, target: 3, actionType: 'PET_PLAYED' },
    { title: 'Alegría Pixelada', description: 'Juega con tu mascota 2 veces.', xpReward: 45, crystals: 20, target: 2, actionType: 'PET_PLAYED' },
    { title: 'Vínculo Fuerte', description: 'Juega con tu mascota 4 veces.', xpReward: 80, crystals: 40, target: 4, actionType: 'PET_PLAYED' },
    { title: 'Mascota Agotada', description: 'Juega con tu mascota 6 veces.', xpReward: 130, crystals: 65, target: 6, actionType: 'PET_PLAYED' },

    // === Item / Gamification Quests ===
    { title: 'Redecorando', description: 'Equipa o cambia un ítem en tu Laboratorio 3D.', xpReward: 40, crystals: 20, target: 1, actionType: 'ITEM_EQUIPPED' },
    { title: 'Nuevo Estilo', description: 'Mueve 3 objetos en tu Laboratorio 3D.', xpReward: 100, crystals: 50, target: 3, actionType: 'ITEM_EQUIPPED' },
    { title: 'Diseñador de Interiores', description: 'Mueve 5 objetos en tu Laboratorio 3D.', xpReward: 150, crystals: 75, target: 5, actionType: 'ITEM_EQUIPPED' },
    { title: 'Toque Personal', description: 'Equipa 2 ítems en tu Laboratorio 3D.', xpReward: 70, crystals: 35, target: 2, actionType: 'ITEM_EQUIPPED' },
    { title: 'Arquitecto Virtual', description: 'Mueve 4 objetos en tu Laboratorio 3D.', xpReward: 120, crystals: 60, target: 4, actionType: 'ITEM_EQUIPPED' },

    // === Store / Purchases Quests ===
    { title: 'Cliente Frecuente', description: 'Compra 1 artículo en la tienda.', xpReward: 50, crystals: 0, target: 1, actionType: 'STORE_PURCHASE' },
    { title: 'Inversión Inteligente', description: 'Compra 2 artículos en la tienda.', xpReward: 100, crystals: 0, target: 2, actionType: 'STORE_PURCHASE' },
    { title: 'Coleccionista', description: 'Compra 3 artículos en la tienda.', xpReward: 150, crystals: 0, target: 3, actionType: 'STORE_PURCHASE' },
    
    // === Mixed/Random Quests ===
    { title: 'Cazador de Bugs', description: 'Completa 2 misiones tipo BOSS.', xpReward: 200, crystals: 100, target: 2, actionType: 'LESSON_COMPLETED' },
    { title: 'Destructor de Retos', description: 'Completa 3 misiones tipo BOSS.', xpReward: 350, crystals: 150, target: 3, actionType: 'LESSON_COMPLETED' },
    { title: 'Maestro de Jefes', description: 'Completa 5 misiones tipo BOSS.', xpReward: 600, crystals: 250, target: 5, actionType: 'LESSON_COMPLETED' },
    { title: 'Primer Jefe', description: 'Completa 1 misión tipo BOSS.', xpReward: 100, crystals: 50, target: 1, actionType: 'LESSON_COMPLETED' }
  ];

  for (const quest of questsData) {
    const existing = await prisma.dailyQuest.findFirst({
      where: { title: quest.title }
    });

    if (!existing) {
      await prisma.dailyQuest.create({
        data: quest
      });
    }
  }

  console.log(`Successfully seeded ${questsData.length} Daily Quests.`);
}
