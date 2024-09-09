import { IsString, IsDecimal, IsOptional, IsDate} from 'class-validator';

export class UpdateInstitutionDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    cnpj?: string;
  
    @IsDecimal()
    @IsOptional()
    latitude?: number;

    @IsDecimal()
    @IsOptional()
    longitude?: number;

    @IsDate()
    @IsOptional()
    updatedAt?: Date

    @IsString()
    @IsOptional()
    updatedBy?: string;
}
