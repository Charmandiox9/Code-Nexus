import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExecutionService } from './execution.service';
import { ExecutionResolver } from './execution.resolver';
import { ExecutionGateway } from './execution.gateway';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [
    GamificationModule,
    ClientsModule.register([
      {
        name: 'EXECUTION_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://nexus:nexus_password@127.0.0.1:5672'],
          queue: 'execution_jobs_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [ExecutionService, ExecutionResolver, ExecutionGateway],
  exports: [ExecutionService],
})
export class ExecutionModule {}
