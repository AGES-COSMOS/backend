import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListagemEventosService {
  constructor(private prisma: PrismaService) {}

  async getEvents(){
    return await this.prisma.event.findMany({
        include: {
            institution: true
            
            
        },
      });
    }
}