import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListagemProjetosService {
  constructor(private prisma: PrismaService) {}

  async getProjects() {
    return await this.prisma.project.findMany({
      include: {
        teacher: true, 
        institution: true, 
        ProjectKeyword: {
          include: {
            keyword: true, 
          },
        },
        ProjectCategory: {
          include: {
            category: true, 
          },
        },
        Event: true, 
        Post: true,  
      },
    });
  }
}
