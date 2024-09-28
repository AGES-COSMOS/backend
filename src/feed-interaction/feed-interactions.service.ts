import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLikeDto } from './create-like.dto';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
@Injectable()
export class FeedInteractionsService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(postId: number, createLikeDto: CreateLikeDto): Promise<void> {
    const { userId } = createLikeDto;
    await this.prisma.postLikes.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async commentPost(postId: number, createCommentDto: CreateCommentDto): Promise<void> {
    const { userId, content } = createCommentDto;
    await this.prisma.postComments.create({
      data: {
        postId,
        userId,
        content,
      },
    });
  }

  async getUpdatedFeed() {
    const posts = await this.prisma.post.findMany({
      include: {
        postLikes: true, 
        postComments: true, 
      },
    });
    return posts; 
}
}
