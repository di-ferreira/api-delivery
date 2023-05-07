import {
  iAddress,
  iAddressRepository,
  iCreateAddress,
} from '@ProjectTypes/Address/iAddressService';
import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import CustomerRepository from '@modules/Customer/Repository';
import AppError from '@shared/errors/AppError';
import AddressRepository from '../Repository';

export default class CreateAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute({
    city,
    customer,
    district,
    number,
    state,
    street,
    complement,
  }: iCreateAddress): Promise<iAddress> {
    const customerRepository = new CustomerRepository();
    let customerExists: iCustomer;
    if (customer.id) {
      customerExists = await customerRepository.findById(customer.id);
    } else {
      customerExists = await customerRepository.findById(Number(customer));
    }

    if (!customerExists) {
      throw new AppError('Customer not exists');
    }

    const addressExists = await this.addressRepository.findExists({
      id: 0,
      city,
      customer,
      district,
      state,
      number,
      street,
      complement,
    });

    console.log('Address Exist', addressExists);

    if (addressExists) {
      throw new AppError('Address exists');
    }

    const address = this.addressRepository.create({
      city,
      customer: customerExists,
      district,
      number,
      state,
      street,
      complement,
    });

    return address;
  }
}
