import { Controller, Get, Put, Body, Post, Param, Query } from '@nestjs/common';
import { GeneralParametersService } from './general-parameters.service';
import { UpdateGeneralParametersDto } from './update-general-parameters.dto';
import { CreateGeneralParametersDto } from './create-general-parameters.dto';

@Controller('general-parameters')
export class GeneralParametersController {
  constructor(
    private readonly GeneralParametersService: GeneralParametersService,
  ) {}

  @Get()
  async findAll() {
    return this.GeneralParametersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.GeneralParametersService.findOne(+id); // O "+" converte string para número
  }

  @Get('parameter/:parameter')
  async findByParameter(@Param('parameter') parameter: string) {
    return this.GeneralParametersService.findByParameter(parameter);
  }

  @Get('by-parameters')
  async findByParameters(@Query('parameters') parameters: string) {
    const parametersArray = parameters.split(','); // Converte a string da query em um array
    return this.GeneralParametersService.findByParameters(parametersArray);
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
