import {
    IsArray,
    IsBoolean,
    IsDate,
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import Decimal from 'decimal.js';


class EventCategoryDto {
    category_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}

class PostDto {
    id: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsDate()
    @IsNotEmpty()
    hour: Date;

    @IsBoolean()
    @IsNotEmpty()
    IsOnline: boolean;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsDecimal()
    @IsNotEmpty()
    latitude: Decimal;

    @IsDecimal()
    @IsNotEmpty()
    longitude: Decimal;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    institution_id: number;

    @IsOptional()
    project_id?: number;

    @IsArray()
    @IsOptional()
    eventCategories?: EventCategoryDto[];

    @IsArray()
    @IsOptional()
    posts?: PostDto[];
}
