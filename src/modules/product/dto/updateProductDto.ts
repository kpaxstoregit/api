import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProductDto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
