import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DailyQuest {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  xpReward: number;

  @Field(() => Int)
  crystals: number;

  @Field()
  actionType: string;
}

@ObjectType()
export class UserDailyQuest {
  @Field()
  userId: string;

  @Field()
  questId: string;

  @Field(() => Int)
  progress: number;

  @Field()
  completed: boolean;

  @Field()
  assignedAt: Date;

  @Field(() => DailyQuest)
  quest: DailyQuest;
}
