import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
  } from '@nestjs/common';
  import { InstitutionService } from './institution.service';
  import { CreateInstitutionDto } from './create-institution.dto';
  import { UpdateInstitutionDto } from './update-institution.dto';
  
  @Controller('institution')
  export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) {}
  
    @Post()
    async createInstitution(@Body() createInstitutionDto: CreateInstitutionDto) {
      return this.institutionService.createInstitution(createInstitutionDto);
    }
  
    @Get(':id')
    async getInstitution(@Param('id') id: number) {
      return this.institutionService.getInstitution(id);
    }
  
    @Put(':id')
    async updateInstitution(
      @Param('id') id: number,
      @Body() updateInstitutionDto: UpdateInstitutionDto,
    ) {
      return this.institutionService.updateInstitution(id, updateInstitutionDto);
    }
  
    @Delete(':id')
    async deleteInstitution(@Param('id') id: number) {
      return this.institutionService.deleteInstitution(id);
    }
  
    @Get()
    async getAllInstitutions() {
      return this.institutionService.getAllInstitutions();
    }
  }
  