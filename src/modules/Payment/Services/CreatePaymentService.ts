import {
  iCreatePayment,
  iPayment,
  iPaymentRepository,
} from '@ProjectTypes/Payment/iPayment';
import AppError from '@shared/errors/AppError';
import PaymentRepository from '../Repository';

export default class CreatePaymentService {
  private paymentRepository: iPaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public async execute({
    method,
    order,
    value,
  }: iCreatePayment): Promise<iPayment> {
    const paymentExists: iPayment[] = await this.paymentRepository.findByOrder(
      order
    );

    if (paymentExists.length >= 1) {
      throw new AppError('There is already one Payment with this order');
    }

    const payment = await this.paymentRepository.create({
      method,
      order,
      value,
    });

    return payment;
  }
}
