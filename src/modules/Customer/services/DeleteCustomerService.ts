import AppError from '@shared/errors/AppError';
import {
  iCustomerRepository,
  iDeleteCustomer,
} from 'src/@types/Customer/iCustomerService';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class DeleteCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ id }: iDeleteCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await this.customerRepository.remove(customer);

    return customer;
  }
}

export default DeleteCustomerService;
