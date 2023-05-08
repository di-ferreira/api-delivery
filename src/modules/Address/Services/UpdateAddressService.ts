import {
  iAddress,
  iAddressRepository,
  iUpdatedAddress,
} from '@ProjectTypes/Address/iAddressService';
import AppError from '@shared/errors/AppError';
import { iCustomer } from '../../../ProjectTypes/Customer/iCustomerService';
import AddressRepository from '../Repository';

class UpdateAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute({
    city,
    customer,
    district,
    id,
    number,
    state,
    street,
    complement,
  }: iUpdatedAddress): Promise<iAddress> {
    let address: iAddress = await this.addressRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found');
    }

    let customerUpdate: iCustomer = address.customer;

    address = {
      city,
      customer: customerUpdate,
      district,
      number,
      state,
      street,
      complement,
      id,
    };

    await this.addressRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;
