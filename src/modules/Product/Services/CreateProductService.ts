import {
  iCreateProduct,
  iProduct,
  iProductRepository,
} from '@ProjectTypes/Product/iProduct';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../Repository';

class CreateProductService {
  private productRepository: iProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({
    costPrice,
    minStock,
    name,
    stock,
    description,
  }: iCreateProduct): Promise<iProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists.length >= 1) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productRepository.create({
      costPrice,
      minStock,
      name,
      stock,
      description,
    });

    return product;
  }
}

export default CreateProductService;
