import {
  iDeletePayment,
  iPayment,
  iPaymentRepository,
} from '@ProjectTypes/Payment/iPayment';
import AppError from '@shared/errors/AppError';
import PaymentRepository from '../Repository';

class DeletePaymentService {
  private paymentRepository: iPaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public async execute({ id }: iDeletePayment): Promise<iPayment> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new AppError('Payment not found');
    }

    await this.paymentRepository.remove(payment);

    return payment;
  }
}

export default DeletePaymentService;
