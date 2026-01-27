import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(80, { cors: '*' })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.auth.userId as number;
    console.log('userid', userId);
    await client.join(`user_${userId}`);
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendToFollowers(followerIds: any[], data: any) {
    const rooms = followerIds.map((id) => `user_${id}`);
    this.server.to(rooms).emit(`notification`, data);
    return;
  }
}
