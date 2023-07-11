import {
  iPayment,
  iPaymentRepository,
  iShowPayment,
} from '@ProjectTypes/Payment/iPayment';
import AppError from '@shared/errors/AppError';
import PaymentRepository from '../Repository';

class ShowPaymentService {
  private paymentRepository: iPaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public async execute({ id }: iShowPayment): Promise<iPayment> {
    const payment = await this.paymentRepository.findById(Number(id));

    if (!payment) {
      throw new AppError('Payment not found');
    }

    return payment;
  }
}

export default ShowPaymentService;
