import {
  iAddress,
  iAddressRepository,
  iDeleteAddress,
} from '@ProjectTypes/Address/iAddressService';
import AppError from '@shared/errors/AppError';
import AddressRepository from '../Repository';

class DeleteAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute({ id }: iDeleteAddress): Promise<iAddress> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found');
    }

    await this.addressRepository.remove(address);

    return address;
  }
}

export default DeleteAddressService;
