import { Controller, Get } from '@nestjs/common';
import { FeedHighlightsService } from './feed-highlights.service';

@Controller('feed-highlights')
export class FeedHighlightsController {
  constructor(private readonly feedHighlightsService: FeedHighlightsService) {}
  @Get()
  async getFeedHighlights() {
    return await this.feedHighlightsService.getFeedHighlights();
  }
}
