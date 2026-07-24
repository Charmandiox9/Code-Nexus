import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SubmitCodeInput {
  @Field(() => String)
  code: string;

  @Field(() => String)
  language: string; // "python", "java", etc.

  @Field(() => String, { nullable: true })
  lessonId?: string; // Para validar si pasó el ejercicio

  @Field(() => ID, { nullable: true })
  userId?: string;
}
