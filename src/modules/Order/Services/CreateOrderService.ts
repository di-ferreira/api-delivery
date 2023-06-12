import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import {
  iCreateOrder,
  iOrder,
  iOrderRepository,
} from '@ProjectTypes/Order/iOrder';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class CreateOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    customer,
    status,
    items,
    obs,
  }: iCreateOrder): Promise<iOrder> {
    const orderExists = await this.orderRepository.findOrderOpenByCustomer(
      customer
    );

    if (orderExists) {
      throw new AppError('There is already one order open this customer');
    }

    if (items.length < 1) {
      throw new AppError('Order not have a Items');
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(
        '🚀 ~ file: CreateOrderService.ts:37 ~ CreateOrderService ~ item:',
        item
      );

      if (!item.menu.active) {
        throw new AppError('Order cannot have an inactive item');
      }
    }
    console.log('hi');
    const SumTotalTotal = (
      orderArray: iItemOrder[],
      propertyObject: string
    ) => {
      return orderArray.reduce((total: number, order: iItemOrder) => {
        return total + order[propertyObject];
      }, 0);
    };

    let totalOrder: number = 0;

    totalOrder = SumTotalTotal(items, 'total');

    const order = await this.orderRepository.create({
      customer,
      status,
      items,
      total: totalOrder,
      obs: obs && obs,
    });

    return order;
  }
}

export default CreateOrderService;
