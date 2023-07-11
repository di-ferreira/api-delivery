import { iPaymentMethodController } from '@ProjectTypes/PaymentMethod/iPaymentMethodController';
import { Request, Response } from 'express';
import CreatePaymentMethodService from '../Services/CreatePaymentMethodService';
import DeletePaymentMethodService from '../Services/DeletePaymentMethodService';
import ListPaymentMethodService from '../Services/ListPaymentMethodService';
import ShowPaymentMethodService from '../Services/ShowPaymentMethodService';
import UpdatePaymentMethodService from '../Services/UpdatePaymentMethodService';

export default class PaymentMethodController
  implements iPaymentMethodController
{
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listPaymentMethod = new ListPaymentMethodService();
    const paymentMethods = await listPaymentMethod.execute({ page, limit });

    return response.json(paymentMethods);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPaymentMethod = new ShowPaymentMethodService();
    const paymentMethod = await showPaymentMethod.execute({ id: Number(id) });
    return response.json(paymentMethod);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createPaymentMethod = new CreatePaymentMethodService();
    const paymentMethod = await createPaymentMethod.execute({
      name,
    });
    return response.status(201).json(paymentMethod);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const createPaymentMethod = new UpdatePaymentMethodService();
    const paymentMethod = await createPaymentMethod.execute({
      id: Number(id),
      name,
    });
    return response.json(paymentMethod);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePaymentMethod = new DeletePaymentMethodService();
    await deletePaymentMethod.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
