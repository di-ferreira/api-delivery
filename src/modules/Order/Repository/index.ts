import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import {
  SearchParamsOrder,
  iOrder,
  iOrderList,
  iOrderRepository,
  iSaveOrder,
  iStatusOrder,
} from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '@ProjectTypes/index';
import { ItemOrder } from '@modules/OrderItem/Entity';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../Entity';

export default class OrderRepository implements iOrderRepository {
  private CustomRepository: Repository<iOrder>;
  private CustomItemRepository: Repository<iItemOrder>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Order);
    this.CustomItemRepository = AppDataSource.getRepository(ItemOrder);
  }

  public async create({
    customer,
    status,
    total,
    obs,
    items,
  }: iSaveOrder): Promise<iOrder> {
    const order = this.CustomRepository.create({
      customer,
      status,
      total,
      obs,
      items,
    });

    await this.CustomRepository.save(order);
    return order;
  }

  public async save(order: iOrder): Promise<iOrder> {
    return await this.CustomRepository.save(order);
  }

  public async findOrderOpenByCustomer(customer: iCustomer): Promise<iOrder> {
    const type = await this.CustomRepository.findOne({
      where: [
        { customer, status: iStatusOrder.FILA },
        { customer, status: iStatusOrder.TRANSITO },
      ],
    });
    return type;
  }

  public async findAll({ page, limit }: SearchParams): Promise<iOrderList> {
    const [orders, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iOrderList = {
      current_page: page,
      data: orders,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(orderID: number): Promise<iOrder> {
    let order = await this.CustomRepository.findOne({
      where: { id: orderID },
    });

    order.items = await this.CustomItemRepository.find({ where: { order } });

    return order;
  }

  public async findByStatus({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList> {
    const status: iStatusOrder = param;
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        status,
      },
    });

    const result: iOrderList = {
      current_page: page,
      data: menus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByCustomer({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList> {
    const customer: iCustomer = param;
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        customer,
      },
    });

    const result: iOrderList = {
      current_page: page,
      data: menus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async remove(order: iOrder): Promise<void> {
    await this.CustomRepository.remove(order);
  }
}
