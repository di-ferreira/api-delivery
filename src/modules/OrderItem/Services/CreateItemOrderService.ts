import { iItemOrderRepository } from '@ProjectTypes/ItemOrder/iItemOrder';
import AppError from '@shared/errors/AppError';

class CreateItemOrderService {
  private orderRepository: iItemOrderRepository;

  constructor() {
    this.orderRepository = new ItemOrderRepository();
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

      if (!item.menu.active) {
        throw new AppError('Order cannot have an inactive item');
      }
    }
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

export default CreateItemOrderService;
