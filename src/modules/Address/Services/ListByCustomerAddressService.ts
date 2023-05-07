import {
  iAddress,
  iAddressRepository,
} from '@ProjectTypes/Address/iAddressService';
import AddressRepository from '../Repository';

export default class ListByCustomerAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute(id_customer: number): Promise<iAddress[]> {
    const addressess = await this.addressRepository.findByCustomer(id_customer);
    return addressess;
  }
}
