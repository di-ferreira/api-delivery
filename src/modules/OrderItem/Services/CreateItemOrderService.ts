import {
  iCreateItemOrder,
  iItemOrder,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iOrderRepository } from '@ProjectTypes/Order/iOrder';
import OrderRepository from '@modules/Order/Repository';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

class CreateItemOrderService {
  private itemOrderRepository: iItemOrderRepository;
  private orderRepository: iOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    menu,
    order,
    total,
    quantity,
  }: iCreateItemOrder): Promise<iItemOrder> {
    let totalItemOrder: number = 0.0;
    let quantityItemOrder: number = 1;
    let orderExists: iOrder;

    orderExists = await this.orderRepository.findById(Number(order));
    console.log(
      '🚀 ~ file: CreateItemOrderService.ts:31 ~ CreateItemOrderService ~ orderExists:',
      orderExists
    );

    if (!orderExists) {
      throw new AppError('No have a Order with this ID');
    }

    if (!menu.active) {
      throw new AppError('Order cannot have an inactive item');
    }

    if (quantity) {
      quantityItemOrder = quantity;
    }

    totalItemOrder = menu.price * quantityItemOrder;

    if (total) {
      totalItemOrder = total;
    }

    const newItem: iCreateItemOrder = {
      menu,
      order: orderExists,
      quantity,
      total: totalItemOrder,
    };

    const itemOrder = await this.itemOrderRepository.create(newItem);

    return itemOrder;
  }
}

export default CreateItemOrderService;
