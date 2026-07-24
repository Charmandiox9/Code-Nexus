import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Lesson } from './lesson.model';

@ObjectType()
export class Concept {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  orderIndex: number;

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];
}
