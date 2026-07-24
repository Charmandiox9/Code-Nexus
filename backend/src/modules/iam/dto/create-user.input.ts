import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Datos necesarios para registrar un nuevo usuario' })
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
