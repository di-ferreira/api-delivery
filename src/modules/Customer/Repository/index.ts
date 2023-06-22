import {
  iCreateCustomer,
  iCustomer,
  iCustomerList,
  iCustomerRepository,
} from '@ProjectTypes/Customer/iCustomerService';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../Entity';

class CustomerRepository implements iCustomerRepository {
  private CustomRepository: Repository<iCustomer>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Customer);
  }

  public async create({ name, phone }: iCreateCustomer): Promise<iCustomer> {
    const customer = this.CustomRepository.create({ name, phone });

    await this.CustomRepository.save(customer);
    return customer;
  }

  public async save(customer: iCustomer): Promise<iCustomer> {
    return await this.CustomRepository.save(customer);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iCustomerList> {
    const [customers, count] = await this.CustomRepository.createQueryBuilder(
      'customer'
    )
      .leftJoinAndSelect('customer.address', 'address')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const result: iCustomerList = {
      current_page: page,
      data: customers,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findByName(name: string): Promise<iCustomer[]> {
    const costumers = await this.CustomRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.address', 'address')
      .where('customer.name = :name', { name })
      .getMany();
    return costumers;
  }

  public async findById(id: number): Promise<iCustomer> {
    const costumer = await this.CustomRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    return costumer;
  }

  public async findByPhone(phone: string): Promise<iCustomer> {
    const costumer = await this.CustomRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.address', 'address')
      .where('customer.phone = :phone', { phone })
      .getOne();
    return costumer;
  }

  public async remove(customer: iCustomer): Promise<void> {
    await this.CustomRepository.remove(customer);
  }
}

export default CustomerRepository;
