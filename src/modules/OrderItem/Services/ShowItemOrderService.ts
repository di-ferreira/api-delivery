import { iOrder, iOrderRepository } from '@ProjectTypes/Order/iOrder';
import { iShowProduct } from '@ProjectTypes/Product/iProduct';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class ShowOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ id }: iShowProduct): Promise<iOrder> {
    const order = await this.orderRepository.findById(Number(id));
    console.log(
      '🚀 ~ file: ShowOrderService.ts:15 ~ ShowOrderService ~ execute ~ order:',
      order
    );

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
