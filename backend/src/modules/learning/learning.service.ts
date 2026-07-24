import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async getConcepts() {
    return this.prisma.concept.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { xpReward: 'asc' }, // Hack simple para el orden por ahora
          include: { language: true }
        },
      },
    });
  }
}
