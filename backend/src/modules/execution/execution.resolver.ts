import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ExecutionService } from './execution.service';
import { ExecutionResult } from './models/execution-result.model';
import { SubmitCodeInput } from './dto/submit-code.input';

@Resolver(() => ExecutionResult)
export class ExecutionResolver {
  constructor(private readonly executionService: ExecutionService) {}

  @Mutation(() => ExecutionResult, {
    name: 'submitCode',
    description: 'Envía un fragmento de código al motor de ejecución aislado',
  })
  async submitCode(@Args('input') input: SubmitCodeInput): Promise<ExecutionResult> {
    return this.executionService.executeCode(input);
  }
}
