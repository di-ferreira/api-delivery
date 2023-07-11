import {
  iPaymentMethodList,
  iPaymentMethodRepository,
} from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import { SearchParams } from '@ProjectTypes/index';
import PaymentMethodRepository from '../Repository';

class ListPaymentMethodService {
  private paymentmethodRepository: iPaymentMethodRepository;

  constructor() {
    this.paymentmethodRepository = new PaymentMethodRepository();
  }

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<iPaymentMethodList> {
    const paymentmethods = await this.paymentmethodRepository.findAll({
      page,
      limit,
    });

    return paymentmethods;
  }
}

export default ListPaymentMethodService;
