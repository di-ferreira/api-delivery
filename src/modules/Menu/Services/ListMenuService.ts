import { iMenuList, iMenuRepository } from '@ProjectTypes/Menu/iMenu';
import { SearchParams } from '@ProjectTypes/index';
import MenuRepository from '../Repository';

class ListMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iMenuList> {
    const meu = await this.menuRepository.findAll({
      page,
      limit,
    });

    return meu;
  }
}

export default ListMenuService;
