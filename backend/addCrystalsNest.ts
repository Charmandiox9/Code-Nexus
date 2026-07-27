import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { GamificationService } from './src/modules/gamification/gamification.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(GamificationService);
  
  // Añadimos cristales a todos los perfiles de gamificación
  const res = await service['prisma'].gamificationProfile.updateMany({
    data: { crystals: { increment: 5000 } }
  });
  console.log('Cristales añadidos a', res.count, 'usuarios.');
  
  await app.close();
}
bootstrap();
