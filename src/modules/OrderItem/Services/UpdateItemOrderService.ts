import {
  iOrder,
  iOrderRepository,
  iUpdatedOrder,
} from '@ProjectTypes/Order/iOrder';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class UpdateOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    id,
    items,
    obs,
    status,
  }: iUpdatedOrder): Promise<iOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    order.items = items;
    order.obs = obs;
    order.status = status;

    await this.orderRepository.save(order);

    return order;
  }
}

export default UpdateOrderService;
