import { iOrder } from '@ProjectTypes/Order/iOrder';
import {
  iCreatePayment,
  iPayment,
  iPaymentList,
  iPaymentRepository,
} from '@ProjectTypes/Payment/iPayment';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../Entity';

export default class PaymentRepository implements iPaymentRepository {
  private CustomRepository: Repository<iPayment>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Payment);
  }
  public async findByOrder(order: iOrder): Promise<iPayment[]> {
    const payments = await this.CustomRepository.find({
      where: { order },
    });
    return payments;
  }

  public async create({
    method,
    order,
    value,
  }: iCreatePayment): Promise<iPayment> {
    const payment = this.CustomRepository.create({
      method,
      order,
      value,
    });

    await this.CustomRepository.save(payment);
    return payment;
  }

  public async save(payment: iPayment): Promise<iPayment> {
    return await this.CustomRepository.save(payment);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iPaymentList> {
    const [payments, count] = await this.CustomRepository.createQueryBuilder()
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iPaymentList = {
      current_page: page,
      data: payments,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(id: number): Promise<iPayment> {
    const payment = await this.CustomRepository.findOne({
      where: { id },
    });
    return payment;
  }

  public async remove(payment: iPayment): Promise<void> {
    await this.CustomRepository.remove(payment);
  }
}
