import {
  iCreateMenu,
  iMenu,
  iMenuList,
  iMenuRepository,
  iUpdatedMenu,
} from '@ProjectTypes/Menu/iMenu';
import { iProduct } from '@ProjectTypes/Product/iProduct';
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
    profit,
    price,
    type,
  }: iCreateMenu): Promise<iMenu> {
    let sumPrice: number = 0;

    if (profit) {
      const SumTotalProducts = (
        productsArray: iProduct[],
        propertyObject: string
      ) => {
        return productsArray.reduce((total: number, product: iProduct) => {
          return total + product[propertyObject];
        }, 0);
      };
      const SumTotal = SumTotalProducts(products, 'costPrice');

      sumPrice = SumTotal + (SumTotal * profit) / 100;
    }

    if (price) {
      sumPrice = price;
    }

    const menu = this.CustomRepository.create({
      description,
      name,
      price: sumPrice,
      products,
      type,
    });

    return await this.CustomRepository.save(menu);
  }

  public async save({
    description,
    id,
    name,
    price,
    products,
    profit,
    type,
  }: iUpdatedMenu): Promise<iMenu> {
    let sumPrice: number = 0;

    if (profit) {
      const SumTotalProducts = (
        productsArray: iProduct[],
        propertyObject: string
      ) => {
        return productsArray.reduce((total: number, product: iProduct) => {
          return total + product[propertyObject];
        }, 0);
      };
      const SumTotal = SumTotalProducts(products, 'costPrice');

      sumPrice = SumTotal + (SumTotal * profit) / 100;
    }

    if (price) {
      sumPrice = price;
    }

    const menu = this.CustomRepository.create({
      id,
      description,
      name,
      price: sumPrice,
      products,
      type,
    });
    return await this.CustomRepository.save(menu);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iMenuList> {
    const [menus, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

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
