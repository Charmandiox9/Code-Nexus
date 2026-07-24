import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SubmitCodeInput } from './dto/submit-code.input';
import { ExecutionResult } from './models/execution-result.model';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class ExecutionService {
  private readonly logger = new Logger(ExecutionService.name);

  constructor(
    @Inject('EXECUTION_QUEUE') private client: ClientProxy,
    private readonly gamificationService: GamificationService,
  ) {}

  async executeCode(input: SubmitCodeInput): Promise<ExecutionResult> {
    this.logger.log(`Enviando código a ejecutar en ${input.language}...`);

    try {
      // Timeout extendido: Rust y C++ necesitan tiempo de compilación
      // python/js: ~5s, typescript: ~15s, java: ~20s, c++: ~30s, rust: ~90s
      const TIMEOUT_MS = input.language === 'rust' ? 90000 : input.language === 'cpp' ? 35000 : input.language === 'java' ? 25000 : 15000;
      const result = await firstValueFrom(
        this.client.send('execute_code', input).pipe(timeout(TIMEOUT_MS)),
      );
      
      let memoryDump = '';
      if (result.memory_trace && result.memory_trace.length > 0) {
        const lastStep = result.memory_trace[result.memory_trace.length - 1];
        const formattedLocals = Object.keys(lastStep.locals).map(key => ({
          name: key,
          type: typeof lastStep.locals[key] === 'number' ? 'number' : 'str',
          value: String(lastStep.locals[key])
        }));
        memoryDump = JSON.stringify(formattedLocals);
      }
      
      // Registrar actividad diaria (excepto en sandbox)
      if (input.userId && input.lessonId !== 'sandbox') {
        await this.gamificationService.recordActivity(input.userId);
      }

      // Si el código corre bien, verificamos si hay expectedOutput
      if (result.status === 'SUCCESS' && input.userId) {
        let isCorrect = true;
        if ((input as any).expectedOutput) {
          isCorrect = result.stdout.trim() === (input as any).expectedOutput.trim();
        }

        if (isCorrect) {
          if (input.lessonId && input.lessonId !== 'sandbox') {
            const xpAdded = await this.gamificationService.addXpForLesson(input.userId, input.lessonId, 10);
            if (xpAdded) {
              this.logger.log(`Se añadieron 10 XP al usuario ${input.userId} por la lección ${input.lessonId}`);
            } else {
              this.logger.log(`Usuario ${input.userId} ya había completado la lección ${input.lessonId}, no recibe XP extra`);
            }
          }
        }
      }

      return {
        ...result,
        memoryDump,
      };
    } catch (error) {
      this.logger.error(`Error ejecutando código: ${error.message}`);
      return {
        stdout: '',
        stderr: error.name === 'TimeoutError' ? 'Error: El código ha excedido el tiempo de ejecución (Timeout).' : 'Error interno al ejecutar el código.',
        status: 'TIMEOUT',
        executionTimeMs: 5000,
      };
    }
  }
}
