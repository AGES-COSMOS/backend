import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDate,
    IsArray,
    ValidateNested,
    } from 'class-validator';
    import { Type } from 'class-transformer';
    
    class TeacherDto {
    id: number;
    
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
    
    class KeywordDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    word: string;
    }
    
    class CategoryDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    }
    
    class ProjectKeywordDto {
    @ValidateNested()
    @Type(() => KeywordDto)
    keyword: KeywordDto;
    }
    
    class ProjectCategoryDto {
    @ValidateNested()
    @Type(() => CategoryDto)
    category: CategoryDto;
    }
    
    class EventDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    }
    
    class PostDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    content: string;
    }
    
    export class ListProjectsDto {
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
    
    @ValidateNested()
    @Type(() => TeacherDto)
    teacher: TeacherDto;
    
    institution_id: number;
    
    @ValidateNested()
    @Type(() => InstitutionDto)
    institution: InstitutionDto;
    
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
    
    @IsString()
    @IsNotEmpty()
    updatedBy: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectKeywordDto)
    ProjectKeyword: ProjectKeywordDto[];
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectCategoryDto)
    ProjectCategory: ProjectCategoryDto[];
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EventDto)
    Event: EventDto[];
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PostDto)
    Post: PostDto[];
    }