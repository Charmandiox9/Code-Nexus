import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { GamificationService } from './src/modules/gamification/gamification.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(GamificationService);
  
  const profiles = await service['prisma'].gamificationProfile.findMany({
    include: { user: true }
  });
  console.dir(profiles, { depth: null });
  
  await app.close();
}
bootstrap();
