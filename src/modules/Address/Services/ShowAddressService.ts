import {
  iAddress,
  iAddressRepository,
  iShowAddress,
} from '@ProjectTypes/Address/iAddressService';
import AppError from '@shared/errors/AppError';
import AddressRepository from '../Repository';

class ShowAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute({ id }: iShowAddress): Promise<iAddress> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new AppError('Address not found');
    }

    return address;
  }
}

export default ShowAddressService;
