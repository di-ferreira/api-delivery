import {
  iPaymentList,
  iPaymentRepository,
} from '@ProjectTypes/Payment/iPayment';
import { SearchParams } from '@ProjectTypes/index';
import PaymentRepository from '../Repository';

class ListPaymentService {
  private paymentRepository: iPaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iPaymentList> {
    const payments = await this.paymentRepository.findAll({
      page,
      limit,
    });

    return payments;
  }
}

export default ListPaymentService;
