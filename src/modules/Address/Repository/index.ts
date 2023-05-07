import {
  iAddress,
  iAddressList,
  iAddressRepository,
  iCreateAddress,
} from '@ProjectTypes/Address/iAddressService';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../Entity';

class AddressRepository implements iAddressRepository {
  private CustomRepository: Repository<Address>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Address);
  }

  public async create({
    city,
    customer,
    district,
    number,
    state,
    street,
    complement,
  }: iCreateAddress): Promise<iAddress> {
    const address = this.CustomRepository.create({
      city,
      complement,
      customer,
      district,
      number,
      state,
      street,
    });

    await this.CustomRepository.save(address);
    return address;
  }

  public async save(address: iAddress): Promise<iAddress> {
    return await this.CustomRepository.save(address);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iAddressList> {
    const [addressess, count] = await this.CustomRepository.createQueryBuilder()
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
    const addressess = await this.CustomRepository.find({
      where: {
        customer: {
          id: id_customer,
        },
      },
      relations: { customer: true },
    });
    return addressess;
  }

  public async findExists(address: iCreateAddress): Promise<iAddress> {
    const addressExists = await this.CustomRepository.findOneBy({
      number: address.number,
      street: address.street,
      district: address.district,
      city: address.city,
      customer: address.customer,
    });
    return addressExists;
  }

  public async findById(id: number): Promise<iAddress> {
    const address = await this.CustomRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    return address;
  }

  public async remove(address: iAddress): Promise<void> {
    await this.CustomRepository.remove(address);
  }
}

export default AddressRepository;
