import { IsOptional, IsString, IsArray, IsNumberString } from 'class-validator';

export class ProjectFiltersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  institutionId?: string;

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  categories?: string[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  latitude?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  distance?: string;
}