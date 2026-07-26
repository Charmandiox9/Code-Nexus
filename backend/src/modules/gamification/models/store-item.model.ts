import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class StoreItem {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field(() => Int)
  price: number;

  @Field()
  rarity: string;

  @Field({ nullable: true })
  imageUrl?: string | null;

  @Field()
  isRotative: boolean;
}
