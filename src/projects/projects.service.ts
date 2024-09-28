import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-projects.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Prisma } from '@prisma/client';
import { ProjectFiltersDto } from './dto/project-filters.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto, imageURL: string) {
    return this.prisma.project.create({
      data: { ...createProjectDto, imageURL },
    });
  }

  async getProject(id: number) {
    return await this.prisma.project.findUnique({ where: { id } });
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

  async getAllProjects(
    filters: ProjectFiltersDto,
    page: number = 1,
    limit: number = 10,
  ) {
    const whereClause: Prisma.ProjectWhereInput = {};
    if (filters.name) {
      whereClause.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters.institutionId) {
      whereClause.institution_id = parseInt(filters.institutionId);
    }
    if (filters.categories && filters.categories.length > 0) {
      whereClause.ProjectCategory = {
        some: {
          category_id: { in: filters.categories.map((id) => parseInt(id)) },
        },
      };
    }
    if (filters.keywords && filters.keywords.length > 0) {
      whereClause.ProjectKeyword = {
        some: {
          keyword_id: { in: filters.keywords.map((id) => parseInt(id)) },
        },
      };
    }
    const projects = await this.prisma.project.findMany({
      where: whereClause,
      include: {
        ProjectCategory: true,
        ProjectKeyword: {
          include: { keyword: true },
        },
        institution: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.project.count({
      where: whereClause,
    });
    return {
      data: projects,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getProjectDetails(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: id },
      include: {
        institution: true,
        teacher: true,
        Event: true,
        ProjectCategory: {
          include: {
            category: true,
          },
        },
        ProjectKeyword: {
          include: {
            keyword: true,
          },
        },
        Post: true,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }
}
