import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PostInteractionGateway {
  @WebSocketServer()
  server: Server;

  // Emitir um evento para novas curtidas
  handleNewLike(postId: number) {
    this.server.emit(`post-${postId}-like`);
  }

  // Emitir um evento para novos comentários
  handleNewComment(postId: number) {
    this.server.emit(`post-${postId}-comment`);
  }
}
