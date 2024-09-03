import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateProjectDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  history: string;

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

  @IsInt()
  @IsNotEmpty()
  teacher_id: number;

  @IsInt()
  @IsNotEmpty()
  institution_id: number;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
