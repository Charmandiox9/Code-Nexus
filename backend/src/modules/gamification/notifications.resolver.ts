import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './models/notification.model';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notification])
  async getNotifications(@Args('userId') userId: string) {
    return this.notificationsService.getNotifications(userId);
  }

  @Query(() => Int)
  async getUnreadNotificationsCount(@Args('userId') userId: string) {
    return this.notificationsService.getUnreadCount(userId);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(
    @Args('userId') userId: string,
    @Args('id') id: string,
  ) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Mutation(() => Boolean)
  async markAllNotificationsAsRead(@Args('userId') userId: string) {
    await this.notificationsService.markAllAsRead(userId);
    return true;
  }
}
