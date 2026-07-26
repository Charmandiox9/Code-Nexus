import { PrismaClient } from '@prisma/client';

export const getStoreSeed = async (prisma: PrismaClient) => {
  console.log('Seeding Store Items...');

  const storeItems = [
    // TEMAS (THEMES)
    {
      name: 'Tema Cyberpunk',
      description: 'Un tema con colores neón, rosas y azules vibrantes.',
      type: 'THEME',
      price: 500,
      rarity: 'EPIC',
      isRotative: true,
    },
    {
      name: 'Tema Dracula',
      description: 'El clásico tema oscuro de Drácula para verdaderos vampiros del código.',
      type: 'THEME',
      price: 300,
      rarity: 'RARE',
      isRotative: false,
    },
    {
      name: 'Tema Matrix',
      description: 'Verde hacker sobre fondo negro profundo.',
      type: 'THEME',
      price: 400,
      rarity: 'RARE',
      isRotative: true,
    },
    {
      name: 'Tema Synthwave',
      description: 'Atardeceres retro y vibras de los 80s.',
      type: 'THEME',
      price: 600,
      rarity: 'LEGENDARY',
      isRotative: true,
    },
    // ITEMS DEL LABORATORIO (LAB_ITEMS)
    {
      name: 'Escritorio Gamer Pro',
      description: 'Un escritorio con luces RGB ajustables.',
      type: 'LAB_ITEM',
      price: 800,
      rarity: 'EPIC',
      isRotative: true,
    },
    {
      name: 'Planta Carnívora USB',
      description: 'Se alimenta de bugs. Decoración perfecta para el laboratorio.',
      type: 'LAB_ITEM',
      price: 250,
      rarity: 'COMMON',
      isRotative: true,
    },
    {
      name: 'Póster de Turing',
      description: 'Inspiración pura en la pared de tu laboratorio.',
      type: 'LAB_ITEM',
      price: 150,
      rarity: 'COMMON',
      isRotative: false,
    },
    {
      name: 'Silla Herman Miller',
      description: 'Ergonomía máxima para no sufrir de la espalda mientras codificas.',
      type: 'LAB_ITEM',
      price: 1200,
      rarity: 'LEGENDARY',
      isRotative: true,
    },
    // ACCESORIOS DE MASCOTA (PET_ACCESSORY)
    {
      name: 'Lentes de Sol Pixelados',
      description: 'Deal with it.',
      type: 'PET_ACCESSORY',
      price: 300,
      rarity: 'RARE',
      isRotative: true,
    },
    {
      name: 'Sombrero Mágico',
      description: 'Aumenta la ganancia de XP de tu mascota un 5% (Cosmético... ¿o no?).',
      type: 'PET_ACCESSORY',
      price: 500,
      rarity: 'EPIC',
      isRotative: true,
    },
    {
      name: 'Bufanda Hacker',
      description: 'Oculta la IP de tu mascota.',
      type: 'PET_ACCESSORY',
      price: 200,
      rarity: 'COMMON',
      isRotative: false,
    },
    // CONSUMIBLES (BOOSTS / SHIELDS)
    {
      name: 'Escudo de Racha',
      description: 'Protege tu racha de programación si no puedes entrar un día.',
      type: 'CONSUMABLE',
      price: 150,
      rarity: 'RARE',
      isRotative: false,
    },
    {
      name: 'Potenciador x2 (1 hora)',
      description: 'Multiplica por 2 la experiencia obtenida durante 1 hora.',
      type: 'BOOST',
      price: 300,
      rarity: 'EPIC',
      isRotative: false,
    },
  ];

  for (const item of storeItems) {
    await prisma.storeItem.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    });
  }

  console.log('Store Items seeded successfully.');
};
