import { PrismaClient, LessonType } from '@prisma/client';

export interface ConceptSeed {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
}

export interface LessonContent {
  theory?: string; // Optional for missions
  instructions: string;
  initialCode: string;
  expectedOutput?: string; // For execution validation
  quizOptions?: string[]; // For quiz missions
  correctOptionIndex?: number; // Index of the correct answer
}

export interface LessonSeed {
  title: string;
  type: LessonType;
  xpReward: number;
  content: LessonContent;
}

export interface SectionSeed {
  concept: ConceptSeed;
  lessons: LessonSeed[]; // Lessons and missions for this concept
}

export interface LanguageSeed {
  slug: string;
  name: string;
  version: string;
  sections: SectionSeed[];
}

export type SeederFunction = (prisma: PrismaClient) => Promise<LanguageSeed>;
