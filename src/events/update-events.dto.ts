import { EventCategory } from '@prisma/client';
import {
    IsString,
    IsNotEmpty,
    IsDate,
    IsInt,
    IsArray,
    IsOptional,
    IsBoolean,
    IsDecimal,
  } from 'class-validator';

  class EventCategoryDto {
    category_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
  }

  class PostDto {
    id: number;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  }

  export class UpdateEventDto{
    id: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsDate()
    @IsOptional()
    date: Date;

    @IsDate()
    @IsOptional()
    hour: Date;

    @IsBoolean()
    @IsOptional()
    isOnline: boolean;

    @IsString()
    @IsOptional()
    address: string;

    @IsDecimal()
    @IsOptional()
    latitude: number;

    @IsDecimal()
    @IsOptional()
    longitude: number;

    @IsOptional()

    institution_id: number;

    @IsOptional()
    project_id?: number;

    @IsDate()
    @IsOptional()
    updatedAt: Date;
  
    @IsString()
    @IsOptional()
    updatedBy: string;

    @IsArray()
    @IsOptional()
    eventCategories?: EventCategoryDto[];

    @IsArray()
    @IsOptional()
    posts?: PostDto[];

  }