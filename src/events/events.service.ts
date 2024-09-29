import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from './create-events.dto';
import { UpdateEventDto } from './update-events.dto';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventsDto: CreateEventDto, imageURL: string) {
    const { project_id, ...eventData } = createEventsDto;
  
    return this.prisma.event.create({
      data: {
        ...eventData,
        imageURL,
        ...(project_id && { project_id }),
      },
    });
  }
  async getEvent(id: number) {
    return this.prisma.event.findUnique({ where: { id: id } });
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
    imageURL?: string,
  ) {
    const currentEvent = await this.prisma.event.findUnique({
      where: { id },
    });

    if (imageURL) {
      const oldImagePath = path.join('public', currentEvent.imageURL);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = imageURL
      ? { ...updateEventDto, imageURL }
      : { ...updateEventDto };

    return this.prisma.event.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteEvent(id: number) {
    const response = await this.prisma.event.delete({ where: { id } });
    const oldImagePath = path.join('public', response.imageURL);

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    return response;
  }

  async getAllEvents() {
    return this.prisma.event.findMany();
  }
}
