import { Resolver, Query, Args } from '@nestjs/graphql';
import { MentorService } from './mentor.service';

@Resolver()
export class MentorResolver {
  constructor(private readonly mentorService: MentorService) {}

  @Query(() => String, { name: 'getMentorHint' })
  async getMentorHint(
    @Args('code') code: string,
    @Args('errorMessage') errorMessage: string,
  ): Promise<string> {
    return this.mentorService.generateHint(code, errorMessage);
  }

  @Query(() => String, { name: 'getProMentorAnalysis' })
  async getProMentorAnalysis(
    @Args('userId') userId: string,
    @Args('code') code: string,
    @Args('task') task: string,
    @Args('errorMessage') errorMessage: string,
  ): Promise<string> {
    return this.mentorService.generateProAnalysis(userId, code, task, errorMessage);
  }
}
