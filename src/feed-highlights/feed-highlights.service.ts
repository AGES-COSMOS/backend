import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedHighlightsService {
  constructor(private prisma: PrismaService) {}
  async getFeedHighlights() {
    const date = new Date(); // Now
    date.setDate(date.getDate() - 7);
    const events = await this.prisma.event.findMany({
      where: {
        updatedAt: {
          gte: date,
        },
      },
    });

    const projects = await this.prisma.project.findMany({
      where: {
        updatedAt: {
          gte: date,
        },
      },
    });
    return { events, projects };
  }
}
