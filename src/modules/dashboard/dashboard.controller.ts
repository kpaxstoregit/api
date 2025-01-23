import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateHistoryOrderDto } from './dto/create-order-history';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/create-order')
  async createOrder(@Body() createHistoryOrderDto: CreateHistoryOrderDto) {
    return this.dashboardService.createOrder(createHistoryOrderDto);
  }

  @Get('/history-orders')
  async getAllHistoryOrders(
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe('8'), ParseIntPipe)
    pageSize: number,
  ) {
    return await this.dashboardService.getAllHistoryOrders(page, pageSize);
  }
}
