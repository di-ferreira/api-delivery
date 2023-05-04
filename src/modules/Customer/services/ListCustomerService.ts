import {
  SearchParams,
  iCustomerList,
  iCustomerRepository,
} from 'src/@types/Customer/iCustomerService';
import CustomerRepository from '../Repository';

class ListCustomerService {
  private customerRepository: iCustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<iCustomerList> {
    const customers = await this.customerRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;
