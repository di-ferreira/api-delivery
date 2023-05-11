import {
  iTypeMenuList,
  iTypeMenuRepository,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import { SearchParams } from '@ProjectTypes/index';
import TypeMenuRepository from '../Repository';

class ListTypeMenuService {
  private productRepository: iTypeMenuRepository;

  constructor() {
    this.productRepository = new TypeMenuRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iTypeMenuList> {
    const products = await this.productRepository.findAll({
      page,
      limit,
    });

    return products;
  }
}

export default ListTypeMenuService;
