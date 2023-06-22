import { iAddressController } from '@ProjectTypes/Address/iAddressController';
import { Request, Response } from 'express';
import CreateAddressService from '../Services/CreateAddress';
import DeleteAddressService from '../Services/DeleteAddressService';
import ListAddressService from '../Services/ListAddressService';
import ListByCustomerAddressService from '../Services/ListByCustomerAddressService';
import ShowAddressService from '../Services/ShowAddressService';
import UpdateAddressService from '../Services/UpdateAddressService';

export default class AddressController implements iAddressController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listAddress = new ListAddressService();
    const addressess = await listAddress.execute({ page, limit });

    return response.json(addressess);
  }

  public async indexByCustomer(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id_customer } = request.params;
    const listByCustomer = new ListByCustomerAddressService();
    const address = await listByCustomer.execute(Number(id_customer));
    return response.json(address);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showAddress = new ShowAddressService();
    const address = await showAddress.execute({ id: Number(id) });
    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, district, city, state, complement } = request.body;
    const { id_customer } = request.params;
    const createAddress = new CreateAddressService();
    const address = await createAddress.execute({
      city,
      customer: Number(id_customer),
      district,
      number,
      state,
      street,
      complement,
    });
    return response.status(201).json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { street, number, district, city, state, complement, customer } =
      request.body;

    const updateAddress = new UpdateAddressService();

    const Address = await updateAddress.execute({
      id: Number(id),
      city,
      customer,
      district,
      number,
      state,
      street,
      complement,
    });
    return response.json(Address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAddress = new DeleteAddressService();
    await deleteAddress.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
