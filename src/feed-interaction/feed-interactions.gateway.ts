import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeedInteractionsService } from './feed-interactions.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FeedInteractionsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly feedInteractionsService: FeedInteractionsService) {}

  async likePost(postId: number, userId: number) {
    await this.feedInteractionsService.likePost(postId, { userId });
    this.emitUpdatedFeed();
  }

  async commentPost(postId: number, userId: number, content: string) {
    await this.feedInteractionsService.commentPost(postId, { userId, content });
    this.emitUpdatedFeed(); 
  }

  async emitUpdatedFeed() {
    const updatedFeed = await this.feedInteractionsService.getUpdatedFeed(); 
    this.server.emit('updateFeed', updatedFeed);
  }
}
