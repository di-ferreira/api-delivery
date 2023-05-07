import {
  iCustomerList,
  iCustomerRepository,
} from '@ProjectTypes/Customer/iCustomerService';
import { SearchParams } from '@ProjectTypes/index';
import CustomerRepository from '../Repository';

class ListCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<iCustomerList> {
    const customers = await this.customerRepository.findAll({
      page,
      limit,
    });

    return customers;
  }
}

export default ListCustomerService;
