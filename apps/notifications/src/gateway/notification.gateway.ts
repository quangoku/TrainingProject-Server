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

  private onlineUsers = new Map<number, boolean>();

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.auth.userId as number;
    if (!this.onlineUsers.get(userId)) {
      this.onlineUsers.set(userId, true);
    }
    await client.join(`user_${userId}`);
    console.log('Client connected:', userId);
    console.log(this.onlineUsers);
  }
  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId as number;
    if (this.onlineUsers.get(userId) !== undefined) {
      this.onlineUsers.set(userId, false);
    }
    console.log('Client disconnected:', userId);
  }

  sendToFollowers(followerIds: any[], data: any) {
    const onlineFollowerIds = followerIds.filter(
      (id: number) => this.onlineUsers.get(id) === true,
    );
    console.log(onlineFollowerIds);
    if (onlineFollowerIds.length === 0) {
      return;
    }
    const rooms = onlineFollowerIds.map((id) => `user_${id}`);
    this.server.to(rooms).emit(`notification`, data);
    return;
  }
}
