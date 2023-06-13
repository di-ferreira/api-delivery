import {
  iCreateItemOrder,
  iItemOrder,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ItemOrder } from '../Entity';

export default class ItemOrderRepository implements iItemOrderRepository {
  private CustomRepository: Repository<iItemOrder>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(ItemOrder);
  }

  public async create({
    menu,
    order,
    total,
    quantity,
  }: iCreateItemOrder): Promise<iItemOrder> {
    const itemOrder = this.CustomRepository.create({
      menu,
      order,
      total,
      quantity,
    });

    await this.CustomRepository.save(itemOrder);
    return itemOrder;
  }

  public async save(itemOrder: iItemOrder): Promise<iItemOrder> {
    return await this.CustomRepository.save(itemOrder);
  }

  public async findByOrder(order_id: number): Promise<iItemOrder[]> {
    return await this.CustomRepository.save(itemOrder);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iItemOrderList> {
    const [orders, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iItemOrderList = {
      current_page: page,
      data: orders,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(orderID: number): Promise<iItemOrder> {
    const type = await this.CustomRepository.findOne({
      where: { id: orderID },
    });
    return type;
  }

  public async findByStatus({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iItemOrderList> {
    const status: iStatusOrder = param;
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        status,
      },
    });

    const result: iItemOrderList = {
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
  }: SearchParamsOrder): Promise<iItemOrderList> {
    const customer: iCustomer = param;
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        customer,
      },
    });

    const result: iItemOrderList = {
      current_page: page,
      data: menus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async remove(order: iItemOrder): Promise<void> {
    await this.CustomRepository.remove(order);
  }
}
