import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class LessonContent {
  @Field(() => String, { nullable: true })
  instructions?: string;

  @Field(() => String, { nullable: true })
  initialCode?: string;

  @Field(() => String, { nullable: true })
  expectedOutput?: string;

  @Field(() => String, { nullable: true })
  theory?: string;
}

@ObjectType()
export class Language {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  type: string;

  @Field(() => Int)
  xpReward: number;

  @Field(() => LessonContent, { nullable: true })
  content?: LessonContent;

  @Field(() => Language, { nullable: true })
  language?: Language;
}
