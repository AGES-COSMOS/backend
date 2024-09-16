import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  id: number;

  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The history of the project' })
  @IsString()
  @IsNotEmpty()
  history: string;

  @ApiProperty({ description: 'The purpose of the project' })
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @ApiProperty({
    description: 'Optional contact for the project',
    required: false,
  })
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiProperty({
    description: 'Start date of the project',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    description: 'End date of the project',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date;

  @ApiProperty({ description: 'The status of the project' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'The ID of the teacher' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  teacher_id: number;

  @ApiProperty({ description: 'The ID of the institution' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  institution_id: number;

  @ApiProperty({
    description: 'The date the project was last updated',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of the person who updated the project',
  })
  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
