import {
    IsString,
    IsNotEmpty,
    IsDate,
    IsInt,
    IsArray,
    IsOptional,
  } from 'class-validator';
  
  class TeacherDto {
    id: number;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    email: string;
  }
  
  class InstitutionDto {
    id: number;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  }
  
  class EventDto {
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
  }
  
  class ProjectCategoryDto {
    category_id: number;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  }
  
  class ProjectKeywordDto {
    keyword_id: number;
  
    @IsString()
    @IsNotEmpty()
    word: string;
  }
  
  class PostDto {
    id: number;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  }
  
  export class CreateListagemProjetosDto {
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
  
    teacher_id: number;
  
    institution_id: number;
  
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
  
    @IsString()
    @IsNotEmpty()
    updatedBy: string;
  
    @IsNotEmpty()
    teacher: TeacherDto;
  
    @IsNotEmpty()
    institution: InstitutionDto;
  
    @IsArray()
    @IsOptional()
    events?: EventDto[];
  
    @IsArray()
    @IsOptional()
    projectCategories?: ProjectCategoryDto[];
  
    @IsArray()
    @IsOptional()
    projectKeywords?: ProjectKeywordDto[];
  
    @IsArray()
    @IsOptional()
    posts?: PostDto[];
  }
  