import {
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
  private CustomItemRepository: Repository<iItemOrder>;

  constructor() {
    this.CustomItemRepository = AppDataSource.getRepository(ItemOrder);
  }

  public async create({
    menu,
    order,
    quantity,
    total,
  }: iItemOrder): Promise<iItemOrder> {
    const itemOrder = this.CustomItemRepository.create({
      menu,
      order,
      quantity,
      total,
    });

    return this.CustomItemRepository.save(itemOrder);
  }

  public async findItemByIdAndOrder(
    order: iOrder,
    idItem: number
  ): Promise<iItemOrder> {
    const itemOrder = await this.CustomItemRepository.findOne({
      where: { id: idItem, order },
    });
    return itemOrder;
  }

  public async save(itemOrder: iItemOrder): Promise<iItemOrder> {
    return await this.CustomItemRepository.save(itemOrder);
  }

  public async findByOrder(orderFind: iOrder): Promise<iItemOrder[]> {
    return await this.CustomItemRepository.find({
      relations: { order: true },
      where: { order: { id: orderFind.id } },
    });
  }

  public async findAll(
    { page, limit }: SearchParams,
    order: iOrder
  ): Promise<iItemOrderList> {
    const [items, count] = await this.CustomItemRepository.findAndCount({
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
    const type = await this.CustomItemRepository.findOne({
      where: { id: itemOrderID },
    });
    return type;
  }

  public async remove(item: iItemOrder): Promise<void> {
    await this.CustomItemRepository.remove(item);
  }
}
