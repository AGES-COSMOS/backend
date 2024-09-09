import {
    IsString,
    IsNotEmpty,
    IsDate,
    IsDecimal,
  } from 'class-validator';
  
  export class CreateInstitutionDto {
  
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;
  
    @IsDecimal()
    @IsNotEmpty()
    latitude: number;

    @IsDecimal()
    @IsNotEmpty()
    longitude: number;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date

    @IsString()
    @IsNotEmpty()
    updatedBy: string;
  }
  