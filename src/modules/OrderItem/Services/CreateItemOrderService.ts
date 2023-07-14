import {
  iCreateItemOrder,
  iItemOrder,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import AppError from '@shared/errors/AppError';
import ItemOrderRepository from '../Repository';

class CreateItemOrderService {
  private itemOrderRepository: iItemOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
  }

  public async execute({
    menu,
    order,
    total,
    quantity,
  }: iCreateItemOrder): Promise<iItemOrder> {
    let totalItemOrder: number = 0.0;
    let quantityItemOrder: number = 1;

    if (!menu.active) {
      throw new AppError('Order cannot have an inactive item');
    }

    if (quantity) {
      quantityItemOrder = quantity;
    }

    totalItemOrder = menu.price * quantityItemOrder;

    if (total) {
      totalItemOrder = total;
    }

    const newItem: iCreateItemOrder = {
      menu,
      order,
      quantity,
      total: totalItemOrder,
    };

    const itemOrder = await this.itemOrderRepository.create(newItem);

    return itemOrder;
  }
}

export default CreateItemOrderService;
