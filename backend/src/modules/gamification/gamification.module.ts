import { Module } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { GamificationResolver } from './gamification.resolver';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsCron } from './notifications.cron';

@Module({
  providers: [
    GamificationService, 
    GamificationResolver, 
    NotificationsService, 
    NotificationsResolver,
    NotificationsCron
  ],
  exports: [GamificationService, NotificationsService],
})
export class GamificationModule {}
