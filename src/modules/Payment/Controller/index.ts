import { iPaymentController } from '@ProjectTypes/Payment/iPaymentController';
import { Request, Response } from 'express';
import CreatePaymentService from '../Services/CreatePaymentService';
import DeletePaymentService from '../Services/DeletePaymentService';
import ListPaymentService from '../Services/ListPaymentService';
import ShowPaymentService from '../Services/ShowPaymentService';
import UpdatePaymentService from '../Services/UpdatePaymentService';

export default class PaymentController implements iPaymentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listPayment = new ListPaymentService();
    const payments = await listPayment.execute({ page, limit });

    return response.json(payments);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPayment = new ShowPaymentService();
    const payment = await showPayment.execute({ id: Number(id) });
    return response.json(payment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { method, order, value } = request.body;
    const createPayment = new CreatePaymentService();
    const payment = await createPayment.execute({
      method,
      order,
      value,
    });
    return response.status(201).json(payment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { method, order, value } = request.body;
    const createPayment = new UpdatePaymentService();
    const payment = await createPayment.execute({
      id: Number(id),
      method,
      order,
      value,
    });
    return response.json(payment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePayment = new DeletePaymentService();
    await deletePayment.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
