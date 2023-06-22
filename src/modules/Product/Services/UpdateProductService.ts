import {
  iProduct,
  iProductRepository,
  iUpdatedProduct,
} from '@ProjectTypes/Product/iProduct';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../Repository';

class UpdateProductService {
  private productRepository: iProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({
    id,
    costPrice,
    description,
    minStock,
    name,
    stock,
  }: iUpdatedProduct): Promise<iProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = name;
    product.costPrice = costPrice;
    product.description = description;
    product.stock = stock;
    product.minStock = minStock;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
