import {
  iDeleteOrder,
  iOrder,
  iOrderRepository,
} from '@ProjectTypes/Order/iOrder';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class DeleteOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ id }: iDeleteOrder): Promise<iOrder> {
    const order = await this.orderRepository.findById(id);
    console.log(
      '🚀 ~ file: DeleteOrderService.ts:18 ~ DeleteOrderService ~ execute ~ order:',
      order
    );

    if (!order) {
      throw new AppError('Order not found');
    }

    const orderRemoved = await this.orderRepository.remove(order);
    console.log(
      '🚀 ~ file: DeleteOrderService.ts:28 ~ DeleteOrderService ~ execute ~ orderRemoved:',
      orderRemoved
    );

    return order;
  }
}

export default DeleteOrderService;
