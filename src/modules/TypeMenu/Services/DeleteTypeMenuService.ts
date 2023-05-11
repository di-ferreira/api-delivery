import {
  iDeleteTypeMenu,
  iTypeMenu,
  iTypeMenuRepository,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import AppError from '@shared/errors/AppError';
import TypeMenuRepository from '../Repository';

class DeleteTypeMenuService {
  private productRepository: iTypeMenuRepository;

  constructor() {
    this.productRepository = new TypeMenuRepository();
  }

  public async execute({ id }: iDeleteTypeMenu): Promise<iTypeMenu> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Type not found');
    }

    await this.productRepository.remove(product);

    return product;
  }
}

export default DeleteTypeMenuService;
