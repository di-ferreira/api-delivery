import { iMenu, iMenuRepository, iUpdatedMenu } from '@ProjectTypes/Menu/iMenu';
import { iProduct } from '@ProjectTypes/Product/iProduct';
import ProductRepository from '@modules/Product/Repository';
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
    active,
    price,
    type,
  }: iUpdatedMenu): Promise<iMenu> {
    const productRepository = new ProductRepository();
    const menu: iMenu = await this.menuRepository.findById(id);

    if (!menu) {
      throw new AppError('Menu not found');
    }

    const SumTotalProducts = (
      productsArray: iProduct[],
      propertyObject: string
    ) => {
      return productsArray.reduce((total: number, product: iProduct) => {
        return total + product[propertyObject];
      }, 0);
    };

    let newProducts: iProduct[] = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.id === 0 || !product.id) {
        newProducts = [...newProducts, await productRepository.create(product)];
      } else {
        newProducts = [...newProducts, product];
      }
    }

    let sumPrice: number = 0;

    if (profit) {
      const SumTotal = SumTotalProducts(newProducts, 'costPrice');
      sumPrice = SumTotal + (SumTotal * profit) / 100;
    }

    if (price) {
      sumPrice = price;
    }

    if (!price && !profit) {
      const SumTotal = SumTotalProducts(newProducts, 'costPrice');
      sumPrice = SumTotal;
    }
    menu.name = name;
    menu.products = products;
    menu.type = type;
    menu.active = active && active;
    menu.description = description;
    menu.price = sumPrice;

    await this.menuRepository.save(menu);

    return menu;
  }
}

export default UpdateMenuService;
