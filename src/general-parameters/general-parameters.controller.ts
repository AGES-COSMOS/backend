import { Controller, Get, Put, Body, Post, Param, Query } from '@nestjs/common';
import { GeneralParametersService } from './general-parameters.service';
import { UpdateGeneralParametersDto } from './update-general-parameters.dto';
import { CreateGeneralParametersDto } from './create-general-parameters.dto';

@Controller('general-parameters')
export class GeneralParametersController {
  constructor(
    private readonly GeneralParametersService: GeneralParametersService,
  ) {}

  // @Get('by-parameters')
  // async findByParameters(@Query('parameters') parameters: string) {
  //   const parametersArray = parameters.split(','); // Converte a string da query em um array
  //   return this.GeneralParametersService.findByParameters(parametersArray);
  // }

  // @Get('parameter/:parameter')
  // async findByParameter(@Param('parameter') parameter: string) {
  //   return this.GeneralParametersService.findByParameter(parameter);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.GeneralParametersService.findOne(+id); // O "+" converte string para número
  }

  @Get()
  async findAll() {
    return this.GeneralParametersService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateGeneralParametersDto) {
    return this.GeneralParametersService.create(dto);
  }

  @Put()
  async update(@Body() dto: UpdateGeneralParametersDto) {
    return this.GeneralParametersService.updateGeneralParameters(dto.content);
  }
}
