import {
  SearchParamsMenu,
  iMenuList,
  iMenuRepository,
} from '@ProjectTypes/Menu/iMenu';
import MenuRepository from '../Repository';

class ListMenuService {
  private menuRepository: iMenuRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
  }

  public async execute({
    page = 1,
    limit = 15,
    active,
  }: SearchParamsMenu): Promise<iMenuList> {
    let menu: iMenuList = {
      current_page: page,
      data: [],
      per_page: limit,
      total: 0,
    };
    console.log(active);
    if (active) {
      menu = await this.menuRepository.findByActive({ active, limit, page });
    } else {
      menu = await this.menuRepository.findAll({
        page,
        limit,
      });
    }
    return menu;
  }
}

export default ListMenuService;
