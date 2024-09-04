import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getAboutUs() {
    return this.aboutUsService.getAboutUs();
  }

  @UseGuards(JwtAuthGuard)  // Somente usuários autenticados
  @Put()
  async updateAboutUs(
    @Body('content') content: string,
    @Body('instagramURL') instagramURL: string,
    @Body('youtubeURL') youtubeURL: string,
    @Body('linkedinURL') linkedinURL: string,
    @Request() req: any,  // JWT armazenado no Request
  ) {
    return this.aboutUsService.updateAboutUs(content, instagramURL, youtubeURL, linkedinURL, req.user.userId);
  }
}
