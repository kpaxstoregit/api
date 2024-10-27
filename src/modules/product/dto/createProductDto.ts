import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

enum ProductStatus {
  NOVIDADE = 'NOVIDADE',
  HOT = 'HOT',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  weight: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  imageUrls: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  suggestionOfUse?: string;

  @IsString()
  @IsOptional()
  benefit?: string;

  @IsString()
  @IsOptional()
  composition?: string;

  @IsString()
  slug: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  promotion?: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  classification?: number;
}
