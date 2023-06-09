import { iCreateMenu, iMenu, iMenuRepository } from '@ProjectTypes/Menu/iMenu';
import { iProduct } from '@ProjectTypes/Product/iProduct';
import ProductRepository from '@modules/Product/Repository';
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
    active,
    price,
    type,
  }: iCreateMenu): Promise<iMenu> {
    const typeRepository = new TypeMenuRepository();
    const productRepository = new ProductRepository();
    const typeExists = await typeRepository.findById(type.id);
    if (products.length < 1) {
      throw new AppError('Menu not have a product');
    }

    if (!typeExists) {
      throw new AppError('Menu not have a type');
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
    let totalProducts: number = SumTotalProducts(newProducts, 'costPrice');

    if (profit) {
      const SumTotal = totalProducts;
      sumPrice = SumTotal + (SumTotal * profit) / 100;
    }

    if (price) {
      sumPrice = price;
    }

    if (!price && !profit) {
      const SumTotal = totalProducts;
      sumPrice = SumTotal;
    }

    const menu = await this.menuRepository.create({
      name,
      description,
      products: newProducts,
      price: sumPrice,
      profit,
      active: active ? active : true,
      type,
    });
    return menu;
  }
}

export default CreateMenuService;
