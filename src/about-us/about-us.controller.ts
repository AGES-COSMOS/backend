import { Controller, Get, Put, Body } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { UpdateAboutUsDto } from './update-about-us.dto';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getAboutUs() {
    return this.aboutUsService.getAboutUs();
  }

  @Put()
  async updateAboutUs(@Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.updateAboutUs(updateAboutUsDto.content);
  }
}
