import {
    IsBoolean,
    IsDate,
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  
  export class CreateEventDto {
    id: number;
  
    @ApiProperty({ description: 'The title of the event' })
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty({
      description: 'Optional image URL for the event',
      required: false,
    })
    @IsString()
    @IsOptional()
    imageURL?: string;
  
    @ApiProperty({ description: 'The description of the event' })
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty({
      description: 'The date of the event',
      type: String,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date;
  
    @ApiProperty({
      description: 'The time of the event',
      type: String,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    hour: Date;
  
    @ApiProperty({ description: 'Is the event online?' })
    @IsBoolean()
    @IsNotEmpty()
    isOnline: boolean;
  
    @ApiProperty({ description: 'The address of the event' })
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty({ description: 'Latitude of the event location' })
    @IsDecimal({ decimal_digits: '9,6' })
    @IsNotEmpty()
    @Type(() => Number)
    latitude: number;
  
    @ApiProperty({ description: 'Longitude of the event location' })
    @IsDecimal({ decimal_digits: '9,6' })
    @IsNotEmpty()
    @Type(() => Number)
    longitude: number;
  
    @ApiProperty({ description: 'The ID of the institution hosting the event' })
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    institution_id: number;
  
    @ApiProperty({
        description: 'The ID of the project associated with the event',
        required: false,
      })
      @IsInt()
      @IsOptional()
      @Type(() => Number)
      project_id?: number;


    @ApiProperty({
      description: 'The date the event was last updated',
      type: String,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    updatedAt: Date;
  
    @ApiProperty({
      description: 'The name of the person who updated the event',
    })
    @IsString()
    @IsNotEmpty()
    updatedBy: string;
  }