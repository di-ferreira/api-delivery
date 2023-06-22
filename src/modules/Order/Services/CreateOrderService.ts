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
    deliveryAddress,
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

    const CalcTotalItem = (item: iItemOrder): iItemOrder => {
      let result: iItemOrder = {
        ...item,
        total: item.menu.price * item.quantity,
      };
      return result;
    };

    // for (let i = 0; i < items.length; i++) {
    //   const item = items[i];

    //   if (!item.menu.active) {
    //     throw new AppError('Order cannot have an inactive item');
    //   }
    // }

    const newItems: iItemOrder[] = items.map((item) => {
      if (!item.menu.active) {
        throw new AppError('Order cannot have an inactive item');
      }
      return CalcTotalItem(item);
    });
    console.log(
      '🚀 ~ file: CreateOrderService.ts:58 ~ CreateOrderService ~ constnewItems:iItemOrder[]=items.map ~ newItems:',
      newItems
    );

    const SumTotalTotal = (
      orderArray: iItemOrder[],
      propertyObject: string
    ) => {
      return orderArray.reduce((total: number, order: iItemOrder) => {
        return total + order[propertyObject];
      }, 0);
    };

    let totalOrder: number = 0;

    totalOrder = SumTotalTotal(newItems, 'total');
    console.log(
      '🚀 ~ file: CreateOrderService.ts:55 ~ CreateOrderService ~ totalOrder:',
      totalOrder
    );

    const order = await this.orderRepository.create({
      customer,
      status,
      items: newItems,
      total: totalOrder,
      obs: obs && obs,
      deliveryAddress,
    });

    return order;
  }
}

export default CreateOrderService;
