import { iCreateMenu, iMenu, iMenuRepository } from '@ProjectTypes/Menu/iMenu';
import { iProduct } from '@ProjectTypes/Product/iProduct';
import TypeMenuRepository from '@modules/TypeMenu/Repository';
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
    price,
    type,
  }: iCreateMenu): Promise<iMenu> {
    const typeRepository = new TypeMenuRepository();
    const typeExists = await typeRepository.findById(type.id);
    const menuExists = await this.menuRepository.findByType(type.id);

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

    if (!typeExists) {
      throw new AppError('Menu not have a type');
    }

    if (menuExists.length >= 1) {
      throw new AppError('There is already one Menu with this type');
    }

    const menu = await this.menuRepository.create({
      name,
      description,
      products,
      price: sumPrice,
      profit,
      type,
    });

    return menu;
  }
}

export default CreateMenuService;
