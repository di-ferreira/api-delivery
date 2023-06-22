import {
  iItemOrder,
  iItemOrderRepository,
  iShowItemOrder,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

class ShowItemOrderService {
  private itemOrderRepository: iItemOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
  }

  public async execute({ id }: iShowItemOrder): Promise<iItemOrder> {
    const itemOrder = await this.itemOrderRepository.findById(Number(id));

    if (!itemOrder) {
      throw new AppError('Item not found');
    }

    return itemOrder;
  }
}

export default ShowItemOrderService;
