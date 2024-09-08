import { Controller, Get, Put, Body } from '@nestjs/common';
import { GeneralParametersService } from './general-parameters.service';
import { UpdateGeneralParametersDto } from './update-general-parameters.dto';

@Controller('general-parameters')
export class GeneralParametersController {
  constructor(private readonly GeneralParametersService: GeneralParametersService) {}

  @Get()
  async getAboutUs() {
    return this.GeneralParametersService.getAboutUs();
  }

  @Put()
  async updateAboutUs(@Body() updateAboutUsDto: UpdateGeneralParametersDto) {
    return this.GeneralParametersService.updateGeneralParameters(updateAboutUsDto.content);
  }
}
