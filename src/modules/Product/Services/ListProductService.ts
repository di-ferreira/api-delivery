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
    let products: iProductList = {
      current_page: page ? page : 1,
      data: [],
      per_page: limit ? limit : 15,
      total: 0,
    };
    const newProducts = await this.productRepository.findAll({
      page: products.current_page,
      limit: products.per_page,
    });
    products = { ...newProducts };
    return products;
  }
}

export default ListProductService;
