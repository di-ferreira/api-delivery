import {
  iCreateTypeMenu,
  iTypeMenu,
  iTypeMenuList,
  iTypeMenuRepository,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { TypeMenu } from '../Entity';

export default class TypeMenuRepository implements iTypeMenuRepository {
  private CustomRepository: Repository<iTypeMenu>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(TypeMenu);
  }

  public async create({
    name,
    description,
  }: iCreateTypeMenu): Promise<iTypeMenu> {
    const typeMenu = this.CustomRepository.create({
      description,
      name,
    });

    await this.CustomRepository.save(typeMenu);
    return typeMenu;
  }

  public async save(typeMenu: iTypeMenu): Promise<iTypeMenu> {
    return await this.CustomRepository.save(typeMenu);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iTypeMenuList> {
    const [typeMenus, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iTypeMenuList = {
      current_page: page,
      data: typeMenus,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByType(typName: string): Promise<iTypeMenu[]> {
    const types = await this.CustomRepository.findBy({
      name: typName,
    });
    return types;
  }

  public async findById(id: number): Promise<iTypeMenu> {
    const type = await this.CustomRepository.findOne({
      where: { id },
    });
    return type;
  }

  public async remove(typeMenu: iTypeMenu): Promise<void> {
    await this.CustomRepository.remove(typeMenu);
  }
}
