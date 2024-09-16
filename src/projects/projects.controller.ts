import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-projects.dto';
import { CreateProjectDto } from './create-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../pipes/sharp.pipe';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';

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
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }
}
