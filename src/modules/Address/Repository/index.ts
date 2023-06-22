import {
  iAddress,
  iAddressList,
  iAddressRepository,
  iExistAddress,
} from '@ProjectTypes/Address/iAddressService';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../Entity';

class AddressRepository implements iAddressRepository {
  private AddressRepository: Repository<iAddress>;

  constructor() {
    this.AddressRepository = AppDataSource.getRepository(Address);
  }

  public async create({
    city,
    customer,
    district,
    number,
    state,
    street,
    complement,
  }: iAddress): Promise<iAddress> {
    const address = this.AddressRepository.create({
      city,
      complement,
      customer,
      district,
      number,
      state,
      street,
    });

    await this.AddressRepository.save(address);
    return address;
  }

  public async save(address: iAddress): Promise<iAddress> {
    return await this.AddressRepository.save(address);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iAddressList> {
    const [addressess, count] =
      await this.AddressRepository.createQueryBuilder()
        .skip(limit * (page - 1))
        .take(limit)
        .getManyAndCount();

    const result: iAddressList = {
      current_page: page,
      data: addressess,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByCustomer(id_customer: number): Promise<iAddress[]> {
    const addressess = await this.AddressRepository.find({
      where: {
        customer: {
          id: id_customer,
        },
      },
    });
    return addressess;
  }

  public async findExists(address: iExistAddress): Promise<iAddress> {
    const addressExists = await this.AddressRepository.findOneBy({
      number: address.number,
      street: address.street,
      district: address.district,
      city: address.city,
      customer: address.customer,
    });
    return addressExists;
  }

  public async findById(id: number): Promise<iAddress> {
    const address = await this.AddressRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    return address;
  }

  public async remove(address: iAddress): Promise<void> {
    await this.AddressRepository.remove(address);
  }
}

export default AddressRepository;
