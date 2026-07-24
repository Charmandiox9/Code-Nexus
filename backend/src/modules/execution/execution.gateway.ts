import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ExecutionService } from './execution.service';
import { SubmitCodeInput } from './dto/submit-code.input';

@WebSocketGateway({ cors: true })
export class ExecutionGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly executionService: ExecutionService) {}

  @SubscribeMessage('executeCode')
  async handleExecuteCode(
    @MessageBody() input: SubmitCodeInput,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('executionUpdate', { status: 'RUNNING', output: 'Ejecutando...' });

    try {
      const result = await this.executionService.executeCode(input);
      
      client.emit('executionResult', result);
    } catch (error) {
      client.emit('executionError', { message: error.message });
    }
  }
}
