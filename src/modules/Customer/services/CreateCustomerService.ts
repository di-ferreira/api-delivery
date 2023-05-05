import {
  iCreateCustomer,
  iCustomerRepository,
} from '@ProjectTypes/Customer/iCustomerService';
import AppError from '@shared/errors/AppError';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class CreateCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ name, phone }: iCreateCustomer): Promise<Customer> {
    const phoneExists = await this.customerRepository.findByPhone(phone);
    if (phoneExists) {
      throw new AppError('There is already one customer with this phone');
    }
    const customer = this.customerRepository.create({ name, phone });

    return customer;
  }
}

export default CreateCustomerService;
