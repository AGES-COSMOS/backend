import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UpdateAboutUsDto } from './update-about-us.dto';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getAboutUs() {
    return this.aboutUsService.getAboutUs();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAboutUs(
    @Body() updateAboutUsDto: UpdateAboutUsDto,
    @Request() req: any,
  ) {
    return this.aboutUsService.updateAboutUs(
      updateAboutUsDto.content,
      updateAboutUsDto.instagramURL,
      updateAboutUsDto.youtubeURL,
      updateAboutUsDto.linkedinURL,
      req.user.userId,
    );
  }
}
