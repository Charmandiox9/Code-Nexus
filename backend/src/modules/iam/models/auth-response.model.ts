import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType({ description: 'Respuesta al iniciar sesión exitosamente' })
export class AuthResponse {
  @Field(() => String, {
    description: 'Token JWT para enviar en el header de autorización',
  })
  accessToken: string;

  @Field(() => User)
  user: User;
}
