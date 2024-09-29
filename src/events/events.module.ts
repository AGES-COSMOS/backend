import { Module } from '@nestjs/common';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}//adicionar na app module o EventModule
