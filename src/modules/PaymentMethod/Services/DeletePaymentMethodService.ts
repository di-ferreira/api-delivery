import {
  iDeletePaymentMethod,
  iPaymentMethod,
  iPaymentMethodRepository,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import AppError from '@shared/errors/AppError';
import PaymentMethodRepository from '../Repository';

class DeletePaymentMethodService {
  private paymentmethodRepository: iPaymentMethodRepository;

  constructor() {
    this.paymentmethodRepository = new PaymentMethodRepository();
  }

  public async execute({ id }: iDeletePaymentMethod): Promise<iPaymentMethod> {
    const paymentmethod = await this.paymentmethodRepository.findById(id);

    if (!paymentmethod) {
      throw new AppError('Payment Method not found');
    }

    await this.paymentmethodRepository.remove(paymentmethod);

    return paymentmethod;
  }
}

export default DeletePaymentMethodService;
