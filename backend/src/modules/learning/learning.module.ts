import { Module } from '@nestjs/common';
import { LearningService } from './learning.service';
import { LearningResolver } from './learning.resolver';

@Module({
  providers: [LearningService, LearningResolver],
  exports: [LearningService],
})
export class LearningModule {}
