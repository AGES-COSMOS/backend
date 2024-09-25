import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListagemEventosService {
  constructor(private prisma: PrismaService) {}

  async getEvents(){
    const events = this.prisma.event.findMany({
        include: {
            institution: true,
            EventCategory: true,
            project: true,
        },
        orderBy: {
          date : 'asc'
        }
        
      });

      const groupedEvents = (await events).reduce((acc, event) => {
        const eventDate = event.date.toISOString().split('T')[0];
        
        if (!acc[eventDate]) {
          acc[eventDate] = [];
        }
        
        acc[eventDate].push(event);
        return acc;
      }, {});
      
      const eventMatrix = Object.entries(groupedEvents);
  
      return eventMatrix;




      
    }
}