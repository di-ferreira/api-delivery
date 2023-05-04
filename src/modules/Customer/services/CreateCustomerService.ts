import AppDataSource from '@shared/infra/typeorm';
import { iCreateCustomer } from 'src/@types/Customer/iCustomerService';
import { Repository } from 'typeorm';
import { Customer } from '../Entity';

class CreateCustomerService {
  private customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = AppDataSource.getRepository(Customer);
  }

  public async execute({ name, phone }: iCreateCustomer): Promise<Customer> {
    const customer = this.customerRepository.create({ name, phone });

    // const phoneExists = await customerRepository.find;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
