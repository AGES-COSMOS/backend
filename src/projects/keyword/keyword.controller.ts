import { Controller, Get, Query } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Tamanho da página',
  })
  async getAllProjectKeywords(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.keywordService.getAllProjectKeywords(page, limit);
  }
}
