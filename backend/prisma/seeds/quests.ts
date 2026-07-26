import { PrismaClient } from '@prisma/client';

export async function seedDailyQuests(prisma: PrismaClient) {
  console.log('Seeding Daily Quests...');

  const questsData = [
    // === Login Quests ===
    {
      title: '¡Presente!',
      description: 'Inicia sesión en la plataforma.',
      xpReward: 10,
      crystals: 5,
      target: 1,
      actionType: 'LOGIN',
    },
    {
      title: 'Dedicación Matutina',
      description: 'Entra a CodeNexus y empieza tu día.',
      xpReward: 20,
      crystals: 10,
      target: 1,
      actionType: 'LOGIN',
    },

    // === Lesson Completion Quests ===
    {
      title: 'Calentamiento de Código',
      description: 'Completa 1 lección de cualquier lenguaje.',
      xpReward: 50,
      crystals: 15,
      target: 1,
      actionType: 'LESSON_COMPLETED',
    },
    {
      title: 'Racha de Aprendizaje',
      description: 'Completa 3 lecciones.',
      xpReward: 150,
      crystals: 40,
      target: 3,
      actionType: 'LESSON_COMPLETED',
    },
    {
      title: 'Maratón de Código',
      description: 'Completa 5 lecciones de corrido.',
      xpReward: 300,
      crystals: 80,
      target: 5,
      actionType: 'LESSON_COMPLETED',
    },
    {
      title: 'Hambre de Conocimiento',
      description: 'Completa 10 lecciones el día de hoy.',
      xpReward: 600,
      crystals: 150,
      target: 10,
      actionType: 'LESSON_COMPLETED',
    },

    // === Pet Interaction Quests ===
    {
      title: 'Dueño Responsable',
      description: 'Alimenta a tu mascota virtual 1 vez.',
      xpReward: 20,
      crystals: 10,
      target: 1,
      actionType: 'PET_FED',
    },
    {
      title: 'Banquete Virtual',
      description: 'Alimenta a tu mascota 3 veces hoy.',
      xpReward: 50,
      crystals: 25,
      target: 3,
      actionType: 'PET_FED',
    },
    {
      title: 'Tiempo de Juego',
      description: 'Juega con tu mascota virtual 1 vez.',
      xpReward: 30,
      crystals: 15,
      target: 1,
      actionType: 'PET_PLAYED',
    },
    {
      title: 'Diversión Sin Fin',
      description: 'Juega con tu mascota 5 veces hoy.',
      xpReward: 100,
      crystals: 50,
      target: 5,
      actionType: 'PET_PLAYED',
    },

    // === Item / Gamification Quests ===
    {
      title: 'Redecorando',
      description: 'Equipa o cambia un ítem en tu Laboratorio 3D.',
      xpReward: 40,
      crystals: 20,
      target: 1,
      actionType: 'ITEM_EQUIPPED',
    },
    {
      title: 'Nuevo Estilo',
      description: 'Mueve 3 objetos en tu Laboratorio 3D.',
      xpReward: 100,
      crystals: 50,
      target: 3,
      actionType: 'ITEM_EQUIPPED',
    },
    
    // === Mixed/Random flavor quests ===
    {
      title: 'Cazador de Bugs',
      description: 'Completa 2 misiones tipo BOSS.',
      xpReward: 200,
      crystals: 100,
      target: 2,
      actionType: 'LESSON_COMPLETED',
    },
    {
      title: 'Explorador Sintáctico',
      description: 'Completa 4 lecciones.',
      xpReward: 200,
      crystals: 50,
      target: 4,
      actionType: 'LESSON_COMPLETED',
    }
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
