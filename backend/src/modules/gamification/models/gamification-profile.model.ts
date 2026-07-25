import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import { GraphQLJSONObject } from 'graphql-type-json';
import { User } from '../../iam/models/user.model';

@ObjectType()
export class Achievement {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  icon: string;
}

@ObjectType()
export class Title {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@ObjectType()
export class UserTitle {
  @Field(() => Boolean)
  isEquipped: boolean;

  @Field(() => Title)
  title: Title;
}

@ObjectType()
export class CodePet {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  languageId?: string | null;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  happiness: number;

  @Field(() => Int)
  health: number;

  @Field(() => Int)
  xp: number;

  @Field(() => Int)
  evolutionStage: number;

  @Field(() => Boolean)
  isEquipped: boolean;
}

@ObjectType()
export class LabItem {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  type: string;
}

@ObjectType()
export class UserLabItem {
  @Field(() => Boolean)
  isEquipped: boolean;

  @Field(() => LabItem)
  item: LabItem;
}

@ObjectType()
export class UserAchievement {
  @Field(() => Achievement)
  achievement: Achievement;
}

@ObjectType()
export class GamificationProfile {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  xp: number;

  @Field(() => Int)
  credits: number;

  @Field(() => Int)
  crystals: number;

  @Field(() => Int)
  currentStreak: number;

  @Field(() => Int)
  bestStreak: number;

  @Field(() => [String])
  completedLessons: string[];

  @Field(() => Date)
  lastActivityAt: Date;

  @Field(() => GraphQLJSONObject)
  skills: any;

  @Field(() => [String], { defaultValue: [] })
  inventory: any;

  @Field(() => [String], { defaultValue: [] })
  activeBoosts: any;

  @Field(() => [UserTitle], { nullable: true })
  titles?: UserTitle[];

  @Field(() => [UserAchievement], { nullable: true })
  achievements?: UserAchievement[];

  @Field(() => [CodePet], { nullable: true })
  pets?: CodePet[];

  @Field(() => [UserLabItem], { nullable: true })
  labItems?: UserLabItem[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  labPositions?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  labRotations?: any;
}
