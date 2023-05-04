import AppError from '@shared/errors/AppError';
import {
  iCustomerRepository,
  iShowCustomer,
} from 'src/@types/Customer/iCustomerService';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class ShowCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ id }: iShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
