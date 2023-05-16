import { iCreateMenu, iMenu, iMenuRepository } from '@ProjectTypes/Menu/iMenu';
import AppError from '@shared/errors/AppError';
import MenuRepository from '../Repository';

class CreateMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({
    name,
    description,
    products,
    profit,
    type,
  }: iCreateMenu): Promise<iMenu> {
    const menuExists = await this.menuRepository.findByType(type.id);

    if (menuExists.length >= 1) {
      throw new AppError('There is already one Menu with this type');
    }

    const menu = await this.menuRepository.create({
      name,
      description,
      products,
      profit,
      type,
    });

    return menu;
  }
}

export default CreateMenuService;
