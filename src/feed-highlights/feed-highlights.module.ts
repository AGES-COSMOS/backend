import { Module } from '@nestjs/common';
import { FeedHighlightsController } from './feed-highlights.controller';
import { FeedHighlightsService } from './feed-highlights.service';

@Module({
  controllers: [FeedHighlightsController],
  providers: [FeedHighlightsService]
})
export class FeedHighlightsModule {}
