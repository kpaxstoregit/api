import { IsInt, Min } from 'class-validator';

export class UpdateItemQuantityDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
