import {
  iDeleteProduct,
  iProduct,
  iProductRepository,
} from '@ProjectTypes/Product/iProduct';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../Repository';

class DeleteProductService {
  private productRepository: iProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({ id }: iDeleteProduct): Promise<iProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productRepository.remove(product);

    return product;
  }
}

export default DeleteProductService;
