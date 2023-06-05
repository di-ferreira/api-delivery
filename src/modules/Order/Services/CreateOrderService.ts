import {
  iCreateOrder,
  iOrder,
  iOrderRepository,
} from '@ProjectTypes/Order/iOrder';
import AppError from '@shared/errors/AppError';

class CreateOrderService {
  private productRepository: iOrderRepository;

  constructor() {
    this.productRepository = new OrderRepository();
  }

  public async execute({
    costPrice,
    minStock,
    name,
    stock,
    describe,
  }: iCreateOrder): Promise<iOrder> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists.length >= 1) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productRepository.create({
      costPrice,
      minStock,
      name,
      stock,
      describe,
    });

    return product;
  }
}

export default CreateOrderService;
