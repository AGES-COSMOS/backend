import { Controller, Post, Param, Delete, Body, Get, UseGuards } from '@nestjs/common';
import { PostInteractionService } from './feed-interaction.service';
import { AuthGuard } from './feed-interaction-auth';

@Controller('posts/:postId/interactions')
export class PostInteractionController {
  constructor(
    private readonly postInteractionService: PostInteractionService,
  ) {}

  @Post('like')
  @UseGuards(AuthGuard) // Garante que o usuário esteja logado
  async likePost(
    @Param('postId') postId: string,
    @Body('userId') userId: number,
  ) {
    return this.postInteractionService.likePost(userId, +postId);
  }

  @Delete('like')
  @UseGuards(AuthGuard)
  async unlikePost(
    @Param('postId') postId: string,
    @Body('userId') userId: number,
  ) {
    return this.postInteractionService.unlikePost(userId, +postId);
  }

  @Get('likes')
  async countLikes(@Param('postId') postId: string) {
    return this.postInteractionService.countLikes(+postId);
  }

  @Post('comments')
  @UseGuards(AuthGuard)
  async addComment(
    @Param('postId') postId: string,
    @Body('userId') userId: number,
    @Body('content') content: string,
  ) {
    return this.postInteractionService.addComment(userId, +postId, content);
  }

  @Get('comments')
  async getComments(@Param('postId') postId: string) {
    return this.postInteractionService.getComments(+postId);
  }
}
