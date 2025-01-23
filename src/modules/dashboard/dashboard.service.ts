import { Injectable } from '@nestjs/common';
import { HistoryOrdersRepository } from 'src/shared/database/repositories/dashboard/history.orders';
import { CreateHistoryOrderDto } from './dto/create-order-history';

@Injectable()
export class DashboardService {
  constructor(
    private readonly historyOrdersRepository: HistoryOrdersRepository,
  ) {}

  async createOrder(data: CreateHistoryOrderDto) {
    const { productsBought, orderDetails, ...orderData } = data;

    const createdOrder = await this.historyOrdersRepository.create({
      ...orderData,
      productsBought,
      orderDetails: orderDetails || null,
    });

    return {
      ...createdOrder,
      productsBought: createdOrder.productsBought,
    };
  }

  async getAllHistoryOrders(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const orders = await this.historyOrdersRepository.findAll({
      skip,
      take,
    });

    return orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      email: order.email,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      avatar: order.customer,
      spentTotal: order.spentTotal,
      productsBought:
        typeof order.productsBought === 'string'
          ? JSON.parse(order.productsBought)
          : order.productsBought,
      orderDetails:
        order.orderDetails && typeof order.orderDetails === 'string'
          ? JSON.parse(order.orderDetails)
          : order.orderDetails,
    }));
  }
}
