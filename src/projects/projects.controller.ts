import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body, UseInterceptors, UploadedFile,
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
    @UploadedFile(SharpPipe) image: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get(':id')
  async getProject(@Param('id') id: number) {
    return this.projectService.getProject(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
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
