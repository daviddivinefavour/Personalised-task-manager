import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust the origin as needed
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.emit('events', data);
  }

  sendTaskUpdate(task: any, message: string) {
    this.server.emit('newTask', { task, message });
  }
}
