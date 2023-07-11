import {
  iPaymentMethod,
  iPaymentMethodRepository,
  iUpdatedPaymentMethod,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import AppError from '@shared/errors/AppError';
import PaymentMethodRepository from '../Repository';

class UpdatePaymentMethodService {
  private paymentMethodRepository: iPaymentMethodRepository;

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository();
  }

  public async execute({
    id,
    name,
  }: iUpdatedPaymentMethod): Promise<iPaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findById(id);

    if (!paymentMethod) {
      throw new AppError('Payment Method not found');
    }

    paymentMethod.name = name;

    await this.paymentMethodRepository.save(paymentMethod);

    return paymentMethod;
  }
}

export default UpdatePaymentMethodService;
