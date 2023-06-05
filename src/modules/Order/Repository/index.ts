import {
  SearchParamsOrder,
  iCreateOrder,
  iOrder,
  iOrderList,
  iOrderRepository,
  iStatusOrder,
} from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../Entity';

export default class OrderRepository implements iOrderRepository {
  private CustomRepository: Repository<iOrder>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Order);
  }

  public async create({
    customer,
    status,
    total,
    obs,
  }: iCreateOrder): Promise<iOrder> {
    const order = this.CustomRepository.create({
      customer,
      status,
      total,
      obs,
    });

    await this.CustomRepository.save(order);
    return order;
  }

  public async save(order: iOrder): Promise<iOrder> {
    return await this.CustomRepository.save(order);
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
    const type = await this.CustomRepository.findOne({
      where: { id: orderID },
    });
    return type;
  }

  public async findByStatus({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList> {
    iStatusOrder;
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        active,
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
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        active,
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
