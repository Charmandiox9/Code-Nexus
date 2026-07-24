import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findFirst({
    where: { username: 'Don Tito' },
    include: { gamification: true }
  });
  if (user) {
    const res = await prisma.gamificationProfile.update({
      where: { userId: user.id },
      data: { crystals: 5000 }
    });
    console.log('Updated user:', user.username, 'ID:', user.id, 'Crystals:', res.crystals);
  } else {
    console.log('User "Don Tito" not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
