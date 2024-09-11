import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';
import { Type } from "class-transformer";

export class UpdateProjectDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
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
  @Type(() => Date)
  start_date?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  teacher_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  institution_id?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}
