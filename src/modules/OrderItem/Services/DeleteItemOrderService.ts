import {
  iDeleteItemOrder,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

export default class DeleteItemOrderService {
  private itemOrderRepository: iItemOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
  }

  public async execute({ id }: iDeleteItemOrder): Promise<[]> {
    const itemOrder = await this.itemOrderRepository.findById(id);

    if (!itemOrder) {
      throw new AppError('Item Order not found');
    }

    await this.itemOrderRepository.remove(itemOrder);

    return [];
  }
}
