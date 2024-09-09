import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGeneralParametersDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  parameter: string;

  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
