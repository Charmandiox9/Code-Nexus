import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PlanType } from '@prisma/client';

registerEnumType(PlanType, {
  name: 'PlanType',
  description: 'Tipo de plan de monetización del usuario',
});

@ObjectType({ description: 'Modelo principal del usuario de CodeNexus' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;

  @Field(() => String, { nullable: true })
  googleId?: string | null;

  @Field(() => PlanType)
  plan: PlanType;

  @Field()
  createdAt: Date;
}
