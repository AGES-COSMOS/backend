import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class EventDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imageURL: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  hour: Date;

  @ApiProperty()
  IsOnline: boolean;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: Decimal;

  @ApiProperty()
  longitude: Decimal;

  @ApiProperty()
  institution_id: number;

  @ApiProperty()
  project_id: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;
}
