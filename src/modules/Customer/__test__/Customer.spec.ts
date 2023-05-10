import CreateCustomerService from '../Services/CreateCustomerService';

describe('Customer Test', () => {
  const customerRepository = new CreateCustomerService();

  it('should be create a Customer', async () => {
    let createCustomer = {
      name: 'Diego Ferreira',
      phone: '(22) 9 0000-0000',
    };
    const customer = await customerRepository.execute(createCustomer);
    expect(customer).toHaveProperty('id');
  });
});
