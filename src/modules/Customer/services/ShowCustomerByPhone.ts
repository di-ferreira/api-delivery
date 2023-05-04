import AppError from '@shared/errors/AppError';
import {
  iCustomerRepository,
  iShowCustomerByPhone,
} from 'src/@types/Customer/iCustomerService';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class ShowCustomerByPhoneService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ phone }: iShowCustomerByPhone): Promise<Customer> {
    const customer = await this.customerRepository.findByPhone(phone);

    if (customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerByPhoneService;
