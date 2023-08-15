import {
  iItemOrder,
  iItemOrderRepository,
  iUpdatedItemOrder,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

export class UpdateItemOrderService {
  private itemOrderRepository: iItemOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
  }

  public async execute({
    id,
    menu,
    quantity,
    total,
  }: iUpdatedItemOrder): Promise<iItemOrder> {
    const item = await this.itemOrderRepository.findById(id);

    if (!item) {
      throw new AppError('Item Order not found');
    }

    item.menu = menu;
    item.quantity = quantity;
    item.total = menu.price * quantity;

    await this.itemOrderRepository.save(item);

    return item;
  }
}
