import { iAddress } from '@ProjectTypes/Address/iAddressService';
import {
  iCreateCustomer,
  iCustomerRepository,
} from '@ProjectTypes/Customer/iCustomerService';
import { Address } from '@modules/Address/Entity';
import AddressRepository from '@modules/Address/Repository';
import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/infra/typeorm';
import { Customer } from '../Entity';
import CustomerRepository from '../Repository';

class CreateCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    name,
    phone,
    address,
  }: iCreateCustomer): Promise<Customer> {
    const phoneExists = await this.customerRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError('There is already one customer with this phone');
    }

    const customer = new Customer();
    customer.name = name;
    customer.phone = phone;

    const addressRepository = new AddressRepository();
    const addressExists = await addressRepository.findExists(
      address as iAddress
    );

    if (addressExists) {
      throw new AppError('Address exists');
    }

    const customerSave = await AppDataSource.manager.save(customer);

    const addressSave = new Address();
    addressSave.street = address.street;
    addressSave.number = address.number;
    addressSave.district = address.district;
    addressSave.city = address.city;
    addressSave.complement = address.complement;
    addressSave.state = address.state;
    addressSave.customer = customerSave;

    await AppDataSource.manager.save(addressSave);

    const result = await this.customerRepository.findById(customerSave.id);

    return result;
  }
}

export default CreateCustomerService;
