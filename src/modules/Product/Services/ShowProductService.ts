import {
  iProduct,
  iProductRepository,
  iShowProduct,
} from '@ProjectTypes/Product/iProduct';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../Repository';

class ShowProductService {
  private productRepository: iProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({ id }: iShowProduct): Promise<iProduct> {
    const product = await this.productRepository.findById(Number(id));

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
