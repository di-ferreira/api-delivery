import {
  iCreateProduct,
  iProduct,
  iProductList,
  iProductRepository,
} from '@ProjectTypes/Product/iProduct';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../Entity';

export default class ProductRepository implements iProductRepository {
  private CustomRepository: Repository<iProduct>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Product);
  }

  public async create({
    costPrice,
    minStock,
    name,
    stock,
    describe,
  }: iCreateProduct): Promise<iProduct> {
    const product = this.CustomRepository.create({
      costPrice,
      minStock,
      name,
      stock,
      describe,
    });

    await this.CustomRepository.save(product);
    return product;
  }

  public async save(product: iProduct): Promise<iProduct> {
    return await this.CustomRepository.save(product);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iProductList> {
    const [products, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iProductList = {
      current_page: page,
      data: products,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByName(name: string): Promise<iProduct[]> {
    const costumers = await this.CustomRepository.findBy({
      name,
    });
    return costumers;
  }

  public async findById(id: number): Promise<iProduct> {
    const costumer = await this.CustomRepository.findOne({
      where: { id },
    });
    return costumer;
  }

  public async remove(product: iProduct): Promise<void> {
    await this.CustomRepository.remove(product);
  }
}
