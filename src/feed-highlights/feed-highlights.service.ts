import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedHighlightsService {
  constructor(private prisma: PrismaService) {}
  async getFeedHighlights(page: number, size: number) {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    const skip = Math.max((page - 1) * size, 0);
    const take = size > 0 ? size : 10;

    const events = await this.prisma.event.findMany({
      where: {
        updatedAt: {
          gte: date,
        },
      },
      skip: skip,
      take: take,
    });

    const projects = await this.prisma.project.findMany({
      where: {
        updatedAt: {
          gte: date,
        },
      },
      skip,
      take,
    });

    return { events, projects };
  }
}
