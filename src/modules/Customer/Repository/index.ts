import AppDataSource from '@shared/infra/typeorm';
import {
  SearchParams,
  iCreateCustomer,
  iCustomer,
  iCustomerList,
  iCustomerRepository,
} from 'src/@types/Customer/iCustomerService';
import { Repository } from 'typeorm';
import { Customer } from '../Entity';

class CustomerRepository implements iCustomerRepository {
  private CustomerRepository: Repository<Customer>;

  constructor() {
    this.CustomerRepository = AppDataSource.getRepository(Customer);
  }

  public async create({ name, phone }: iCreateCustomer): Promise<iCustomer> {
    const customer = this.CustomerRepository.create({ name, phone });

    await this.CustomerRepository.save(customer);
    return customer;
  }

  public async save(customer: iCustomer): Promise<iCustomer> {
    return await this.CustomerRepository.save(customer);
  }

  public async findAll({ page, limit }: SearchParams): Promise<iCustomerList> {
    const [customers, count] =
      await this.CustomerRepository.createQueryBuilder()
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
    const costumers = await this.CustomerRepository.findBy({
      name,
    });
    return costumers;
  }

  public async findById(id: number): Promise<iCustomer> {
    const costumer = await this.CustomerRepository.findOneBy({ id });
    return costumer;
  }

  public async findByPhone(phone: string): Promise<iCustomer> {
    const costumer = await this.CustomerRepository.findOneBy({ phone });
    return costumer;
  }

  public async remove(customer: iCustomer): Promise<void> {
    await this.CustomerRepository.remove(customer);
  }
}

export default CustomerRepository;
