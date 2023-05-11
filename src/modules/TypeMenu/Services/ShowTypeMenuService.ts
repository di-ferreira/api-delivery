import {
  iShowTypeMenu,
  iTypeMenu,
  iTypeMenuRepository,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import AppError from '@shared/errors/AppError';
import TypeMenuRepository from '../Repository';

class ShowTypeMenuService {
  private productRepository: iTypeMenuRepository;

  constructor() {
    this.productRepository = new TypeMenuRepository();
  }

  public async execute({ id }: iShowTypeMenu): Promise<iTypeMenu> {
    const product = await this.productRepository.findById(Number(id));

    if (!product) {
      throw new AppError('Type not found');
    }

    return product;
  }
}

export default ShowTypeMenuService;
