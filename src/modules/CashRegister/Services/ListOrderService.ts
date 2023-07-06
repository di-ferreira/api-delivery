import { iOrderList, iOrderRepository } from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '@ProjectTypes/index';
import OrderRepository from '../Repository';

class ListOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iOrderList> {
    let orders: iOrderList = {
      current_page: page ? page : 1,
      data: [],
      per_page: limit ? limit : 15,
      total: 0,
    };

    const newOrders = await this.orderRepository.findAll({
      page: orders.current_page,
      limit: orders.per_page,
    });
    orders = { ...newOrders };

    return orders;
  }
}

export default ListOrderService;
