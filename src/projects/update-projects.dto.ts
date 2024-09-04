import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  history?: string;

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
}
