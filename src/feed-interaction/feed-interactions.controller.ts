import { Body, Controller, Post, Param, UseGuards } from '@nestjs/common';
import { FeedInteractionsService } from './feed-interactions.service';
import { CreateLikeDto } from './create-like.dto';
import { CreateCommentDto } from './create-comment.dto';
import { AuthGuard } from './auth.guard';

@Controller('feed-interactions')
export class FeedInteractionsController {
  constructor(private readonly feedInteractionsService: FeedInteractionsService) {}

  @Post(':postId/like')
  @UseGuards(AuthGuard)
  likePost(@Param('postId') postId: number, @Body() createLikeDto: CreateLikeDto) {
    return this.feedInteractionsService.likePost(postId, createLikeDto);
  }

  @Post(':postId/comment')
  @UseGuards(AuthGuard)
  commentPost(@Param('postId') postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.feedInteractionsService.commentPost(postId, createCommentDto);
  }
}
