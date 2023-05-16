import { iMenu, iMenuRepository, iShowMenu } from '@ProjectTypes/Menu/iMenu';
import AppError from '@shared/errors/AppError';
import MenuRepository from '../Repository';

class ShowMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({ id }: iShowMenu): Promise<iMenu> {
    const menu = await this.menuRepository.findById(Number(id));

    if (!menu) {
      throw new AppError('Menu not found');
    }

    return menu;
  }
}

export default ShowMenuService;
