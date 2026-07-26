import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../core/prisma/prisma.service';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsCron {
  private readonly logger = new Logger(NotificationsCron.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  // Se ejecuta todos los días a las 8:00 PM (20:00)
  @Cron('0 20 * * *')
  async handleDailyPracticeReminders() {
    this.logger.log('Running daily practice reminders job...');
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Buscar perfiles de gamificación cuya última actividad fue hace más de 24 hrs
    const inactiveProfiles = await this.prisma.gamificationProfile.findMany({
      where: {
        lastActivityAt: {
          lt: yesterday,
        },
      },
    });

    for (const profile of inactiveProfiles) {
      // Verificar si ya le enviamos un recordatorio hoy
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      const alreadyNotified = await this.prisma.notification.findFirst({
        where: {
          userId: profile.id, // En GamificationProfile, id = userId
          type: 'REMINDER',
          createdAt: {
            gte: startOfDay,
          },
        },
      });

      if (!alreadyNotified) {
        // Enviar notificación de recordatorio (Duolingo style)
        const messages = [
          '¡Hey! Es hora de practicar. ¡Mantén tu racha viva!',
          'Tus mascotas te extrañan. ¡Ven a programar un rato!',
          '¡No pierdas tu racha! 5 minutos al día hacen la diferencia.',
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        await this.notificationsService.createNotification(
          profile.id,
          'Recordatorio de Práctica',
          randomMsg,
          'REMINDER',
        );
        this.logger.debug(`Sent reminder to user ${profile.id}`);
      }
    }
    this.logger.log('Daily practice reminders completed.');
  }
}
