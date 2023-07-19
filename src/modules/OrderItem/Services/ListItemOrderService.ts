import {
  SearchParamsItemOrder,
  iItemOrderList,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iOrderRepository } from '@ProjectTypes/Order/iOrder';
import OrderRepository from '@modules/Order/Repository';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

export default class ListItemOrderService {
  private itemOrderRepository: iItemOrderRepository;
  private orderRepository: iOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    page,
    limit,
    order,
  }: SearchParamsItemOrder): Promise<iItemOrderList> {
    let items: iItemOrderList = {
      current_page: page ? page : 1,
      data: [],
      per_page: limit ? limit : 15,
      total: 0,
    };
    let orderExists: iOrder;

    if (typeof order === 'number') {
      this.orderRepository.findById(Number(order)).then((res) => {
        orderExists = res;
      });
    } else if (typeof order === 'object') {
      orderExists = order;
    } else {
      throw new AppError('This Item have a type unknown');
    }

    const newOrders = await this.itemOrderRepository.findAll(
      {
        page: items.current_page,
        limit: items.per_page,
      },
      orderExists
    );
    items = { ...newOrders };

    return items;
  }
}
