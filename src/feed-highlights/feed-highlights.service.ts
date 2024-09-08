import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedHighlightsService {
  constructor(private prisma: PrismaService) {}
  async getFeedHighlights(page: number, size: number) {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    const skip = (page - 1) * size;
    const take = size > 0 ? size : 10;

    const events = await this.prisma.event.findMany({
      where: {
        updatedAt: {
          gte: date,
        },
      },
      skip,
      take,
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
