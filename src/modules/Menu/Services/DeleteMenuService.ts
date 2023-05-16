import { iDeleteMenu, iMenu, iMenuRepository } from '@ProjectTypes/Menu/iMenu';
import AppError from '@shared/errors/AppError';
import MenuRepository from '../Repository';

class DeleteMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({ id }: iDeleteMenu): Promise<iMenu> {
    const menu = await this.menuRepository.findById(id);

    if (!menu) {
      throw new AppError('Menu not found');
    }

    await this.menuRepository.remove(menu);

    return menu;
  }
}

export default DeleteMenuService;
