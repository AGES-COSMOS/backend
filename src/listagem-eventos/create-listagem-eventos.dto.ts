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

  class InstitutionDto {
    id: number;
  
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

  class ProjectDto {
    id: number;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    history: string;
  
    @IsString()
    @IsOptional()
    imageURL?: string;
  
    @IsString()
    @IsNotEmpty()
    purpose: string;
  
    @IsString()
    @IsOptional()
    contact?: string;
  
    @IsDate()
    @IsNotEmpty()
    start_date: Date;
  
    @IsDate()
    @IsOptional()
    end_date?: Date;
  
    @IsString()
    @IsNotEmpty()
    status: string;

  }


  export class CreateListagemEventoDto{
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsDate()
    @IsNotEmpty()
    hour: Date;

    @IsBoolean()
    @IsNotEmpty()
    isOnline: boolean;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsDecimal()
    @IsNotEmpty()
    latitude: number;

    @IsDecimal()
    @IsNotEmpty()
    longitude: number;

    institution_id: number;

    @IsNotEmpty()
    institution: InstitutionDto;

    @IsOptional()
    project_id?: number;

    @IsOptional()
    project?: ProjectDto;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
  
    @IsString()
    @IsNotEmpty()
    updatedBy: string;

    @IsArray()
    @IsOptional()
    eventCategories?: EventCategoryDto[];

    @IsArray()
    @IsOptional()
    posts?: PostDto[];

  }