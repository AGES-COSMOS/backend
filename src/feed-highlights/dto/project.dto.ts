import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  history: string;

  @ApiProperty()
  purpose: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  institution_id: number;

  @ApiProperty()
  teacher_id: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;
}
