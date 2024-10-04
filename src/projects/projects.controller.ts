import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-projects.dto';
import { CreateProjectDto } from './create-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../pipes/sharp.pipe';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ProjectFiltersDto } from './dto/project-filters.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProjectDto })
  @ApiOkResponse({
    description: 'Project created successfully',
    type: CreateProjectDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async createProject(
    @UploadedFile(SharpPipe) imageURL: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    if (!imageURL) {
      throw new BadRequestException(['image should not be empty']);
    }
    return this.projectService.createProject(createProjectDto, imageURL);
  }

  @Get(':id')
  async getProject(@Param('id') id: number) {
    return this.projectService.getProject(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProjectDto })
  @ApiOkResponse({
    description: 'Project updated successfully',
    type: UpdateProjectDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile(SharpPipe) imageURL?: string,
  ) {
    return this.projectService.updateProject(id, updateProjectDto, imageURL);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Tamanho da página',
  })
  @ApiQuery({ type: ProjectFiltersDto })
  @ApiOkResponse({})
  async getAllProjects(
    @Query() filters: ProjectFiltersDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectService.getAllProjects(filters, page, limit);
  }

  @Get(':id')
  async getProjectDetails(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid project ID');
    }
    return await this.projectService.getProjectDetails(numericId);
  }
}
