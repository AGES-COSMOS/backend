import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-projects.dto';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto, imageURL: string) {
    return this.prisma.project.create({
      data: { ...createProjectDto, imageURL },
    });
  }

  async getProject(id: number) {
    return this.prisma.project.findUnique({ where: { id: id } });
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
    imageURL?: string,
  ) {
    const currentProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (imageURL) {
      const oldImagePath = path.join('public', currentProject.imageURL);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = imageURL
      ? { ...updateProjectDto, imageURL }
      : { ...updateProjectDto };

    return this.prisma.project.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteProject(id: number) {
    const response = await this.prisma.project.delete({ where: { id } });
    const oldImagePath = path.join('public', response.imageURL);

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    return response;
  }

  async getAllProjects() {
    return this.prisma.project.findMany();
  }
}
