import {
  iCustomerRepository,
  iUpdatedCustomer,
} from '@ProjectTypes/Customer/iCustomerService';
import AppError from '@shared/errors/AppError';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class UpdateCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    id,
    name,
    phone,
  }: iUpdatedCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    const customerByPhone = await this.customerRepository.findByPhone(phone);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    if (customerByPhone && customerByPhone.id !== id) {
      throw new AppError('There is already one customer with this phone');
    }

    customer.name = name;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
