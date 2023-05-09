import {
  iCustomerRepository,
  iShowCustomer,
} from '@ProjectTypes/Customer/iCustomerService';
import AppError from '@shared/errors/AppError';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class ShowCustomerByPhoneService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ phoneid }: iShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findByPhone(String(phoneid));

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerByPhoneService;
