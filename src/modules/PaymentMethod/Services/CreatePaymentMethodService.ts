import {
  iCreatePaymentMethod,
  iPaymentMethod,
  iPaymentMethodList,
  iPaymentMethodRepository,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import AppError from '@shared/errors/AppError';
import PaymentMethodRepository from '../Repository';

export default class CreatePaymentMethodService {
  private paymentMethodRepository: iPaymentMethodRepository;

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository();
  }

  public async execute({
    name,
  }: iCreatePaymentMethod): Promise<iPaymentMethod> {
    const paymentMethodExists: iPaymentMethodList =
      await this.paymentMethodRepository.findByName({
        limit: 15,
        page: 1,
        param: name,
      });

    if (paymentMethodExists.data.length >= 1) {
      throw new AppError('There is already one Payment Method with this name');
    }

    const paymentMethod = await this.paymentMethodRepository.create({
      name,
    });

    return paymentMethod;
  }
}
