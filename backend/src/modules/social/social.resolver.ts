import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';
import GraphQLJSON from 'graphql-type-json';

@Resolver()
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Mutation(() => Boolean)
  async sendFriendRequest(
    @Args('userId') userId: string,
    @Args('targetUsername') targetUsername: string,
  ) {
    return this.socialService.sendFriendRequest(userId, targetUsername);
  }

  @Mutation(() => Boolean)
  async acceptFriendRequest(
    @Args('userId') userId: string,
    @Args('friendId') friendId: string,
  ) {
    return this.socialService.acceptFriendRequest(userId, friendId);
  }

  @Query(() => [GraphQLJSON])
  async getFriends(@Args('userId') userId: string) {
    const friends = await this.socialService.getFriends(userId);
    return friends;
  }

  @Query(() => [GraphQLJSON])
  async getFriendActivityFeed(@Args('userId') userId: string) {
    return this.socialService.getFriendActivityFeed(userId);
  }

  @Query(() => [GraphQLJSON])
  async getLeaderboard(
    @Args('userId') userId: string,
    @Args('language', { nullable: true }) language?: string,
  ) {
    return this.socialService.getLeaderboard(userId, 10, language);
  }
}
