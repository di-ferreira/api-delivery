import { iMenu, iMenuRepository, iUpdatedMenu } from '@ProjectTypes/Menu/iMenu';
import AppError from '@shared/errors/AppError';
import MenuRepository from '../Repository';

class UpdateMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({
    id,
    name,
    description,
    products,
    profit,
    type,
  }: iUpdatedMenu): Promise<iMenu> {
    const menu: iMenu = await this.menuRepository.findById(id);

    if (!menu) {
      throw new AppError('Menu not found');
    }

    menu.name = name;
    menu.products = products;
    menu.type = type;
    menu.description = description;

    await this.menuRepository.save(menu);

    return menu;
  }
}

export default UpdateMenuService;
