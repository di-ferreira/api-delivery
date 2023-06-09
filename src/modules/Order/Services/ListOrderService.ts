import { iOrderList, iOrderRepository } from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '@ProjectTypes/index';
import OrderRepository from '../Repository';

class ListOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iOrderList> {
    const orders = await this.orderRepository.findAll({
      page,
      limit,
    });

    return orders;
  }
}

export default ListOrderService;
