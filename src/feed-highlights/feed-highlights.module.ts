import { Module } from '@nestjs/common';
import { FeedHighlightsController } from './feed-highlights.controller';
import { FeedHighlightsService } from './feed-highlights.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FeedHighlightsController],
  providers: [FeedHighlightsService, PrismaService],
})
export class FeedHighlightsModule {}
