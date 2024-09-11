import {
    IsString,
    IsOptional,
    IsDate,
    IsArray,
    IsNotEmpty,
    IsInt,
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
  
export class UpdateListagemProjetosDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    history?: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsOptional()
    purpose?: string;

    @IsString()
    @IsOptional()
    contact?: string;

    @IsDate()
    @IsOptional()
    start_date?: Date;

    @IsDate()
    @IsOptional()
    end_date?: Date;

    @IsString()
    @IsOptional()
    status?: string;

    @IsInt()
    @IsOptional()
    teacher_id?: number;

    @IsInt()
    @IsOptional()
    institution_id?: number;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsString()
    @IsOptional()
    updatedBy?: string;

    @IsOptional()
    teacher?: TeacherDto;

    @IsOptional()
    institution?: InstitutionDto;

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
