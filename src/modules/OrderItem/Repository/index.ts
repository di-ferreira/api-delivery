import {
  iCreateItemOrder,
  iItemOrder,
  iItemOrderList,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder } from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ItemOrder } from '../Entity';

export default class ItemOrderRepository implements iItemOrderRepository {
  private CustomRepository: Repository<iItemOrder>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(ItemOrder);
  }

  public async findItemByIdAndOrder(
    order: iOrder,
    idItem: number
  ): Promise<iItemOrder> {
    const itemOrder = await this.CustomRepository.findOne({
      where: { id: idItem, order },
    });
    return itemOrder;
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

    return this.CustomRepository.save(itemOrder);
  }

  public async save(itemOrder: iItemOrder): Promise<iItemOrder> {
    return await this.CustomRepository.save(itemOrder);
  }

  public async findByOrder(order: iOrder): Promise<iItemOrder[]> {
    return await this.CustomRepository.find({ where: { order } });
  }

  public async findAll(
    { page, limit }: SearchParams,
    order: iOrder
  ): Promise<iItemOrderList> {
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
