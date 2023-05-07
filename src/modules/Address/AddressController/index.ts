import { iController } from '@ProjectTypes/index';
import { Request, Response } from 'express';
import CreateAddressService from '../Services/CreateAddress';

export default class AddressController implements iController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const page = request.query.page ? Number(request.query.page) : 1;
    // const limit = request.query.limit ? Number(request.query.limit) : 15;
    // const listAddress = new ListAddressService();
    // const addressess = await listAddress.execute({ page, limit });

    // return response.json(addressess);
    return response.json('');
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const showAddress = new ShowAddressService();
    // const Address = await showAddress.execute({ id: Number(id) });
    // return response.json(Address);
    return response.json('');
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, district, city, state, complement, customer } =
      request.body;
    const createAddress = new CreateAddressService();
    const Address = await createAddress.execute({
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

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const { name, phone } = request.body;
    // const updateAddress = new UpdateAddressService();
    // const Address = await updateAddress.execute({
    //   id: Number(id),
    //   name,
    //   phone,
    // });
    // return response.json(Address);
    return response.json('');
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const deleteAddress = new DeleteAddressService();
    // await deleteAddress.execute({ id: Number(id) });
    return response.json([]);
  }
}
