import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  type: string;

  @Field()
  isRead: boolean;

  @Field()
  createdAt: Date;
}
