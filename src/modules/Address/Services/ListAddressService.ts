import {
  iAddressList,
  iAddressRepository,
} from '@ProjectTypes/Address/iAddressService';
import { SearchParams } from '@ProjectTypes/index';
import AddressRepository from '../Repository';

export default class ListAddressService {
  private addressRepository: iAddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  public async execute({ limit, page }: SearchParams): Promise<iAddressList> {
    const addressess = await this.addressRepository.findAll({
      page,
      limit,
    });
    return addressess;
  }
}
