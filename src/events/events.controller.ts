import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { EventService } from './events.service';
  import { UpdateEventDto } from './update-events.dto';
  import { CreateEventDto } from './create-events.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { SharpPipe } from '../pipes/sharp.pipe';
  import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
  
  @Controller('event')
  export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateEventDto })
    @ApiOkResponse({
      description: 'Event created successfully',
      type: CreateEventDto,
    })
    @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @UploadedFile(SharpPipe) imageURL: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    if (!imageURL) {
      throw new BadRequestException(['image should not be empty']);
    }
    return this.eventService.createEvent(createEventDto, imageURL);
    }

    @Get(':id')
    async getEvent(@Param('id') id: number) {
      return this.eventService.getEvent(id);
    }
  
    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UpdateEventDto })
    @ApiOkResponse({
      description: 'Event updated successfully',
      type: UpdateEventDto,
    })
    @UseInterceptors(FileInterceptor('image'))
    async updateEvent(
      @Param('id') id: number,
      @Body() updateEventDto: UpdateEventDto,
      @UploadedFile(SharpPipe) imageURL?: string,
    ) {
      return this.eventService.updateEvent(id, updateEventDto, imageURL);
    }
  
    @Delete(':id')
    async deleteEvent(@Param('id') id: number) {
      return this.eventService.deleteEvent(id);
    }
  
    @Get()
    async getAllEvents() {
      return this.eventService.getAllEvents();
    }
  }
  