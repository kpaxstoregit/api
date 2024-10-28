// src/modules/cart/dto/add-item.dto.ts
import { IsInt, IsString, Min } from 'class-validator';

export class AddItemDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
