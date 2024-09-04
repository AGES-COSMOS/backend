import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-projects.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({ data: { ...createProjectDto } });
  }
  async getProject(id: number) {
    return this.prisma.project.findUnique({ where: { id: id } });
  }
  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: { ...updateProjectDto },
    });
  }
  async deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
  async getAllProjects() {
    return this.prisma.project.findMany();
  }
}
