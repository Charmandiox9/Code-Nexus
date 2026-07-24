import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorResolver } from './mentor.resolver';

@Module({
  providers: [MentorService, MentorResolver],
  exports: [MentorService],
})
export class MentorModule {}
