import { iCashRegisterController } from '@ProjectTypes/CashRegister/iCashRegisterController';
import { iUpdatedCashRegister } from '@ProjectTypes/CashRegister/iCashRegisterService';
import { Request, Response } from 'express';
import CreateCashRegisterService from '../Services/CreateCashRegisterService';
import DeleteOrderService from '../Services/DeleteCashRegisterService';
import ListCashRegisterService from '../Services/ListCashRegisterService';
import ShowCashRegisterService from '../Services/ShowCashRegisterService';
import UpdateCashRegisterService from '../Services/UpdateCashRegisterService';

export default class CashRegisterController implements iCashRegisterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const listCashRegister = new ListCashRegisterService();

    const cashRegisters = await listCashRegister.execute({ page, limit });

    return response.json(cashRegisters);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCashRegister = new ShowCashRegisterService();
    const cashRegister = await showCashRegister.execute({ id: Number(id) });
    return response.json(cashRegister);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCashRegister = new CreateCashRegisterService();

    const cashRegister = await createCashRegister.execute();

    return response.status(201).json(cashRegister);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { open } = request.body;

    const updateCashRegister = new UpdateCashRegisterService();

    let updatedCashRegister: iUpdatedCashRegister = {
      id: Number(id),
      open,
    };

    const order = await updateCashRegister.execute(updatedCashRegister);
    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrder = new DeleteOrderService();
    await deleteOrder.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
