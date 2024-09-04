import { Controller, Get, Query } from '@nestjs/common';
import { FeedHighlightsService } from './feed-highlights.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { GetFeedHighlightsDto } from './dto/get-feed-highlights.dto';

@Controller('feed-highlights')
export class FeedHighlightsController {
  constructor(private readonly feedHighlightsService: FeedHighlightsService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({ name: 'size', required: false, description: 'Tamanho da página' })
  @ApiOkResponse({
    description: 'Lista de eventos e projetos atualizados nos últimos 7 dias',
    type: GetFeedHighlightsDto,
  })
  async getFeedHighlights(
    @Query('page') page: number = 1,
    @Query('size') size: number = 0,
  ): Promise<GetFeedHighlightsDto> {
    return await this.feedHighlightsService.getFeedHighlights(page, size);
  }
}
