import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExecutionResult {
  @Field(() => String)
  stdout: string;

  @Field(() => String)
  stderr: string;

  @Field(() => String)
  status: string; // SUCCESS, ERROR, TIMEOUT

  @Field(() => Int)
  executionTimeMs: number;

  @Field(() => String, { nullable: true })
  memoryDump?: string; // Serialized memory state for the visual debugger
}
