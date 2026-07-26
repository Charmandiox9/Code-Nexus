import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Notification } from './models/notification.model';

@Resolver(() => Notification)
@UseGuards(GqlAuthGuard)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notification])
  async getNotifications(@CurrentUser() user: any) {
    return this.notificationsService.getNotifications(user.id);
  }

  @Query(() => Int)
  async getUnreadNotificationsCount(@CurrentUser() user: any) {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(
    @CurrentUser() user: any,
    @Args('id') id: string,
  ) {
    return this.notificationsService.markAsRead(id, user.id);
  }

  @Mutation(() => Boolean)
  async markAllNotificationsAsRead(@CurrentUser() user: any) {
    await this.notificationsService.markAllAsRead(user.id);
    return true;
  }
}
