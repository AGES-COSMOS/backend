import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class KeywordService {
  constructor(private prisma: PrismaService) {}
  async getAllProjectKeywords(page: number, limit: number) {
    const projectKeywords = await this.prisma.projectKeyword.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.projectKeyword.count();
    return {
      data: projectKeywords,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
