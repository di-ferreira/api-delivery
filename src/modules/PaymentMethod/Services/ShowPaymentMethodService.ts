import {
  iPaymentMethod,
  iPaymentMethodRepository,
  iShowPaymentMethod,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import AppError from '@shared/errors/AppError';
import PaymentMethodRepository from '../Repository';

class ShowPaymentMethodService {
  private paymentmethodRepository: iPaymentMethodRepository;

  constructor() {
    this.paymentmethodRepository = new PaymentMethodRepository();
  }

  public async execute({ id }: iShowPaymentMethod): Promise<iPaymentMethod> {
    const paymentmethod = await this.paymentmethodRepository.findById(
      Number(id)
    );

    if (!paymentmethod) {
      throw new AppError('Payment Method not found');
    }

    return paymentmethod;
  }
}

export default ShowPaymentMethodService;
