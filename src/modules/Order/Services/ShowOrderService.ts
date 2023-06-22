import {
  iOrder,
  iOrderRepository,
  iShowOrder,
} from '@ProjectTypes/Order/iOrder';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class ShowOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ id }: iShowOrder): Promise<iOrder> {
    const order = await this.orderRepository.findById(Number(id));

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
