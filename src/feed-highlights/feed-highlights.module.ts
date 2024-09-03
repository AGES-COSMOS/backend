import { Module } from '@nestjs/common';
import { FeedHighlightsController } from './feed-highlights.controller';
import { FeedHighlightsService } from './feed-highlights.service';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [FeedHighlightsController],
  providers: [FeedHighlightsService],
  imports: [PrismaModule],
  exports: [FeedHighlightsService],
})
export class FeedHighlightsModule {}
