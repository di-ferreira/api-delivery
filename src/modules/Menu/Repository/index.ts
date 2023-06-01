import {
  iCreateMenu,
  iMenu,
  iMenuList,
  iMenuRepository,
  iUpdatedMenu,
} from '@ProjectTypes/Menu/iMenu';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../Entity';

export default class MenuRepository implements iMenuRepository {
  private CustomRepository: Repository<iMenu>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Menu);
  }

  public async create({
    name,
    description,
    products,
    price,
    type,
    active,
  }: iCreateMenu): Promise<iMenu> {
    const menu = this.CustomRepository.create({
      description,
      name,
      price,
      products,
      type,
      active,
    });

    return await this.CustomRepository.save(menu);
  }

  public async save({
    description,
    id,
    name,
    price,
    products,
    type,
    active,
  }: iUpdatedMenu): Promise<iMenu> {
    const menu = this.CustomRepository.create({
      id,
      description,
      name,
      price,
      products,
      type,
      active,
    });
    return await this.CustomRepository.save(menu);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iMenuList> {
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
    });

    const result: iMenuList = {
      current_page: page,
      data: menus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByType(typeID: number): Promise<iMenu[]> {
    const menus = await this.CustomRepository.findBy({
      type: {
        id: typeID,
      },
    });
    return menus;
  }

  public async findByActive({ active, page, limit }): Promise<iMenuList> {
    const [menus, count] = await this.CustomRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        active,
      },
    });

    const result: iMenuList = {
      current_page: page,
      data: menus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByProduct(productID: number): Promise<iMenu[]> {
    const menus = await this.CustomRepository.findBy({
      products: {
        id: productID,
      },
    });
    return menus;
  }

  public async findById(id: number): Promise<iMenu> {
    const type = await this.CustomRepository.findOne({
      where: { id },
    });
    return type;
  }

  public async remove(menu: iMenu): Promise<void> {
    await this.CustomRepository.remove(menu);
  }
}
