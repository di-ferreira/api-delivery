import {
  SearchParamsPaymentMethod,
  iCreatePaymentMethod,
  iPaymentMethod,
  iPaymentMethodList,
  iPaymentMethodRepository,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../Entity';

export default class PaymentMethodRepository
  implements iPaymentMethodRepository
{
  private CustomRepository: Repository<iPaymentMethod>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(PaymentMethod);
  }
  public async findByName({
    param,
    limit = 15,
    page = 1,
  }: SearchParamsPaymentMethod): Promise<iPaymentMethodList> {
    const name: string = param;
    const [paymentMethods, count] =
      await this.CustomRepository.createQueryBuilder('paymentMethods')
        .skip(limit * (page - 1))
        .take(limit)
        .where('paymentMethods.name = :name', { name })
        .getManyAndCount();

    const result: iPaymentMethodList = {
      current_page: page,
      data: paymentMethods,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async create({ name }: iCreatePaymentMethod): Promise<iPaymentMethod> {
    const paymentMethod = this.CustomRepository.create({
      name,
    });

    await this.CustomRepository.save(paymentMethod);
    return paymentMethod;
  }

  public async save(paymentMethod: iPaymentMethod): Promise<iPaymentMethod> {
    return await this.CustomRepository.save(paymentMethod);
  }

  public async findAll({
    page,
    limit,
  }: SearchParams): Promise<iPaymentMethodList> {
    const [paymentMethods, count] =
      await this.CustomRepository.createQueryBuilder()
        .skip(limit * (page - 1))
        .take(limit)
        .getManyAndCount();

    const result: iPaymentMethodList = {
      current_page: page,
      data: paymentMethods,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(id: number): Promise<iPaymentMethod> {
    const type = await this.CustomRepository.findOne({
      where: { id },
    });
    return type;
  }

  public async remove(paymentMethod: iPaymentMethod): Promise<void> {
    await this.CustomRepository.remove(paymentMethod);
  }
}
