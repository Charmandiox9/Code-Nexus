import { Resolver, Query } from '@nestjs/graphql';
import { LearningService } from './learning.service';
import { Concept } from './models/concept.model';

@Resolver()
export class LearningResolver {
  constructor(private readonly learningService: LearningService) {}

  @Query(() => [Concept])
  async concepts() {
    return this.learningService.getConcepts();
  }
}
