import { PrismaClient } from '@prisma/client';

export async function seedRewards(prisma: PrismaClient) {
  console.log('Seeding Achievements and Titles...');

  // === ACHIEVEMENTS ===
  const achievements = [
    // Principiantes
    { slug: 'first_blood', name: 'Primera Sangre', description: 'Completa tu primera lección.', icon: 'DROP', xpReward: 50, crystalReward: 10 },
    { slug: 'hacker_init', name: 'Iniciado', description: 'Crea tu cuenta en CodeNexus.', icon: 'COMPUTER', xpReward: 10, crystalReward: 5 },
    { slug: 'baby_steps', name: 'Primeros Pasos', description: 'Completa 5 lecciones en cualquier lenguaje.', icon: 'FOOTPRINT', xpReward: 100, crystalReward: 20 },
    
    // Rachas
    { slug: 'streak_3', name: 'Calentando Motores', description: 'Consigue una racha de 3 días.', icon: 'FIRE', xpReward: 100, crystalReward: 20 },
    { slug: 'marathon_runner', name: 'Corredor de Maratón', description: 'Consigue una racha de 7 días.', icon: 'FIRE', xpReward: 200, crystalReward: 50 },
    { slug: 'streak_14', name: 'Constancia Pura', description: 'Consigue una racha de 14 días.', icon: 'FIRE', xpReward: 400, crystalReward: 100 },
    { slug: 'streak_30', name: 'Hábito Inquebrantable', description: 'Consigue una racha de 30 días.', icon: 'DIAMOND', xpReward: 1000, crystalReward: 300 },
    
    // Mascotas
    { slug: 'pet_owner', name: 'Adopción', description: 'Desbloquea tu primera mascota.', icon: 'PET', xpReward: 100, crystalReward: 25 },
    { slug: 'pet_lover', name: 'Amante de las Mascotas', description: 'Lleva una mascota al nivel 10.', icon: 'HEART', xpReward: 300, crystalReward: 100 },
    { slug: 'pet_master', name: 'Maestro Evolutivo', description: 'Lleva una mascota a su evolución final (Nivel 4).', icon: 'STAR', xpReward: 500, crystalReward: 200 },
    { slug: 'zoo_keeper', name: 'Cuidador del Zoológico', description: 'Desbloquea 3 mascotas diferentes.', icon: 'PET', xpReward: 400, crystalReward: 150 },
    
    // Lenguajes
    { slug: 'python_fan', name: 'Encantador de Serpientes', description: 'Completa 10 lecciones de Python.', icon: 'SNAKE', xpReward: 200, crystalReward: 50 },
    { slug: 'java_fan', name: 'Adicto a la Cafeína', description: 'Completa 10 lecciones de Java.', icon: 'COFFEE', xpReward: 200, crystalReward: 50 },
    { slug: 'js_fan', name: 'Tejedor Web', description: 'Completa 10 lecciones de JavaScript.', icon: 'SPIDER', xpReward: 200, crystalReward: 50 },
    { slug: 'cpp_fan', name: 'Astronauta Cuántico', description: 'Completa 10 lecciones de C++.', icon: 'ROCKET', xpReward: 200, crystalReward: 50 },
    { slug: 'polyglot', name: 'Políglota', description: 'Completa al menos 1 lección en 3 lenguajes distintos.', icon: 'GLOBE', xpReward: 400, crystalReward: 150 },
    { slug: 'omniglot', name: 'Omníglota', description: 'Completa al menos 1 lección en TODOS los lenguajes.', icon: 'GLOBE', xpReward: 1000, crystalReward: 500 },
    
    // Rendimiento y Misiones
    { slug: 'perfectionist', name: 'Perfeccionista', description: 'Completa 10 lecciones sin fallar.', icon: 'STAR', xpReward: 500, crystalReward: 200 },
    { slug: 'bug_squasher', name: 'Aplastador de Bugs', description: 'Completa 5 misiones de Debugging (BOSS).', icon: 'BUG', xpReward: 300, crystalReward: 100 },
    { slug: 'boss_slayer', name: 'Cazador de Jefes', description: 'Derrota a 3 Jefes (BOSS).', icon: 'SWORD', xpReward: 400, crystalReward: 150 },
    { slug: 'speed_demon', name: 'Demonio de la Velocidad', description: 'Completa una lección en menos de 1 minuto.', icon: 'LIGHTNING', xpReward: 150, crystalReward: 50 },
    
    // Economía
    { slug: 'rich_kid', name: 'Bolsillos Llenos', description: 'Acumula 1,000 Cristales.', icon: 'GEM', xpReward: 0, crystalReward: 200 },
    { slug: 'shopaholic', name: 'Comprador Compulsivo', description: 'Compra 5 ítems en la Tienda.', icon: 'CART', xpReward: 250, crystalReward: 50 },
    
    // Social
    { slug: 'friendly', name: 'Amigable', description: 'Añade a tu primer amigo.', icon: 'PEOPLE', xpReward: 100, crystalReward: 20 },
    { slug: 'social_butterfly', name: 'Mariposa Social', description: 'Ten 10 amigos en tu lista.', icon: 'PEOPLE', xpReward: 300, crystalReward: 100 },
  ];

  for (const ach of achievements) {
    const existing = await prisma.achievement.findUnique({ where: { slug: ach.slug } });
    if (!existing) {
      await prisma.achievement.create({ data: ach });
    }
  }

  // === TITLES ===
  const titles = [
    // Niveles de Habilidad
    { name: 'Novato', description: 'Recién llegado al Nexo.' },
    { name: 'Aprendiz', description: 'Dando los primeros pasos en el código.' },
    { name: 'Codificador', description: 'Capaz de escribir scripts funcionales.' },
    { name: 'Desarrollador', description: 'Maestro de la lógica y los algoritmos.' },
    { name: 'Arquitecto de Software', description: 'Constructor de sistemas complejos.' },
    { name: 'Ingeniero Elite', description: 'Resuelve problemas que otros consideran imposibles.' },
    { name: 'Leyenda del Nexo', description: 'Dominio absoluto de todos los lenguajes.' },
    
    // Temáticos por Lenguaje
    { name: 'Pythonista', description: 'Entusiasta de la indentación y código limpio.' },
    { name: 'Java Master', description: 'Experto en Programación Orientada a Objetos.' },
    { name: 'JS Ninja', description: 'Dominador del asincronismo y el DOM.' },
    { name: 'C++ Hacker', description: 'Control total de la memoria.' },
    { name: 'Rustacean', description: 'Programador seguro y rápido.' },
    
    // Mascotas
    { name: 'Amigo de las Bestias', description: 'Cuidador experto de mascotas virtuales.' },
    { name: 'Domador de Dragones', description: 'Llevó a su JS-Dragon al máximo nivel.' },
    { name: 'Mecánico Cuántico', description: 'Operador de Caffeine-Mech y Quantum Rocket.' },
    
    // Estilo de Juego
    { name: 'Insomne', description: 'Programa a altas horas de la madrugada.' },
    { name: 'El Inquebrantable', description: 'Más de 30 días de racha.' },
    { name: 'Cazador de Bugs', description: 'No deja un solo error vivo.' },
    { name: 'Coleccionista', description: 'Posee la mitad de los ítems de la tienda.' },
    { name: 'Dios del Código', description: 'Poseedor de todos los logros.' }
  ];

  for (const title of titles) {
    const existing = await prisma.title.findFirst({ where: { name: title.name } });
    if (!existing) {
      await prisma.title.create({ data: title });
    }
  }

  console.log(`Successfully seeded ${achievements.length} Achievements and ${titles.length} Titles.`);
}
