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
    page,
    limit,
    active,
  }: SearchParamsMenu): Promise<iMenuList> {
    let menu: iMenuList = {
      current_page: page ? page : 1,
      data: [],
      per_page: limit ? limit : 15,
      total: 0,
    };
    if (active === undefined) {
      const newMenu = await this.menuRepository.findAll({
        page: menu.current_page,
        limit: menu.per_page,
      });
      menu = { ...newMenu };
    } else {
      const activeFind: boolean = JSON.parse(active);
      const newMenu = await this.menuRepository.findByActive({
        active: activeFind,
        page: menu.current_page,
        limit: menu.per_page,
      });
      menu = { ...newMenu };
    }
    return menu;
  }
}

export default ListMenuService;
