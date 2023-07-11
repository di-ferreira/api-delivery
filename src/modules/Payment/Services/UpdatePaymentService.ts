import {
  iPayment,
  iPaymentRepository,
  iUpdatedPayment,
} from '@ProjectTypes/Payment/iPayment';
import AppError from '@shared/errors/AppError';
import PaymentRepository from '../Repository';

class UpdatePaymentService {
  private paymentRepository: iPaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public async execute({
    id,
    order,
    method,
    value,
  }: iUpdatedPayment): Promise<iPayment> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new AppError('Payment not found');
    }

    payment.method = method;
    payment.value = value;
    payment.order = order;

    await this.paymentRepository.save(payment);

    return payment;
  }
}

export default UpdatePaymentService;
