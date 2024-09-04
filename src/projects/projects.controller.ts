import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-projects.dto';
import { CreateProjectDto } from './create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
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
