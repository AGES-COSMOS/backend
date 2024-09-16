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

    institution_id: number;

    @IsNotEmpty()
    institution: InstitutionDto;

    @IsOptional()
    project_id?: number;

    @IsOptional()
    project?: ProjectDto;

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