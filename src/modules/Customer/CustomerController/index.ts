import { iCustomerController } from '@ProjectTypes/Customer/iCustomerController';
import { Request, Response } from 'express';
import CreateCustomerService from '../Services/CreateCustomerService';
import DeleteCustomerService from '../Services/DeleteCustomerService';
import ListCustomerService from '../Services/ListCustomerService';
import ShowCustomerService from '../Services/ShowCustomerService';
import UpdateCustomerService from '../Services/UpdateCustomerService';

export default class CustomerController implements iCustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listCustomer = new ListCustomerService();
    const customers = await listCustomer.execute({ page, limit });

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { phoneid } = request.params;
    const showCustomer = new ShowCustomerService();
    const customer = await showCustomer.execute({ phoneid: phoneid });
    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, address } = request.body;
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, phone, address });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, phone } = request.body;
    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({
      id: Number(id),
      name,
      phone,
    });
    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id: Number(id) });
    return response.json([]);
  }
}
