import {
  iProductList,
  iProductRepository,
} from '@ProjectTypes/Product/iProduct';
import { SearchParams } from '@ProjectTypes/index';
import ProductRepository from '../Repository';

class ListProductService {
  private productRepository: iProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iProductList> {
    const products = await this.productRepository.findAll({
      page,
      limit,
    });

    return products;
  }
}

export default ListProductService;
