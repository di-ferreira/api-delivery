import {
  SearchParamsItemOrder,
  iCreateItemOrder,
  iItemOrder,
  iItemOrderList,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder } from '@ProjectTypes/Order/iOrder';
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

    let newItem: iItemOrder;
    this.CustomRepository.save(itemOrder)
      .then((item) => {
        newItem = item;
      })
      .catch((err) => {
        console.log('item order Repositore error', err);
      });

    return newItem;
  }

  public async save(itemOrder: iItemOrder): Promise<iItemOrder> {
    return await this.CustomRepository.save(itemOrder);
  }

  public async findByOrder(order: iOrder): Promise<iItemOrder[]> {
    return await this.CustomRepository.find({ where: { order } });
  }

  public async findAll({
    page,
    limit,
    order,
  }: SearchParamsItemOrder): Promise<iItemOrderList> {
    const [items, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { order },
    });

    const result: iItemOrderList = {
      current_page: page,
      data: items,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(itemOrderID: number): Promise<iItemOrder> {
    const type = await this.CustomRepository.findOne({
      where: { id: itemOrderID },
    });
    return type;
  }

  public async remove(item: iItemOrder): Promise<void> {
    await this.CustomRepository.remove(item);
  }
}
