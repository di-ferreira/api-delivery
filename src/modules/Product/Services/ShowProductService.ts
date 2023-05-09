import {
  iCustomer,
  iCustomerRepository,
  iShowCustomer,
} from '@ProjectTypes/Customer/iCustomerService';
import AppError from '@shared/errors/AppError';
import CustomerRepository from '../Repository';

class ShowCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ phoneid }: iShowCustomer): Promise<iCustomer> {
    let customer: iCustomer;
    if (String(phoneid).length < 10) {
      customer = await this.customerRepository.findById(Number(phoneid));
    } else {
      customer = await this.customerRepository.findByPhone(String(phoneid));
    }

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
