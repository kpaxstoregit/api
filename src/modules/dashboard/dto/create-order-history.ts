import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHistoryOrderDto {
  @IsString()
  id: string;

  @IsString()
  customer: string;

  @IsString()
  email: string;

  @IsString()
  paymentStatus: string;

  @IsString()
  orderStatus: string;

  @IsString()
  paymentMethod: string;

  @IsString()
  avatar: string;

  @IsNumber()
  spentTotal: number;

  @IsArray()
  productsBought: {
    title: string;
    price?: number;
    quantity: number;
  }[];

  @IsOptional()
  @IsArray()
  orderDetails?: {
    route: string;
  }[];
}
