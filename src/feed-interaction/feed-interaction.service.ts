import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostInteractionService {
  constructor(private prisma: PrismaService) {}

  // Adicionar curtida
  async likePost(userId: number, postId: number) {
    return this.prisma.postLikes.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    });
  }

  // Remover curtida
  async unlikePost(userId: number, postId: number) {
    return this.prisma.postLikes.deleteMany({
      where: { user_id: userId, post_id: postId },
    });
  }

  // Contar curtidas
  async countLikes(postId: number) {
    return this.prisma.postLikes.count({
      where: { post_id: postId },
    });
  }

  // Adicionar comentário
  async addComment(userId: number, postId: number, content: string) {
    return this.prisma.postComments.create({
      data: {
        user_id: userId,
        post_id: postId,
        content,
      },
    });
  }

  // Obter comentários
  async getComments(postId: number) {
    return this.prisma.postComments.findMany({
      where: { post_id: postId },
      include: { user: true },
    });
  }

  // Contar comentários
  async countComments(postId: number) {
    return this.prisma.postComments.count({
      where: { post_id: postId },
    });
  }
}
