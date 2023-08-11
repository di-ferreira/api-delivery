import { iItemOrderController } from '@ProjectTypes/ItemOrder/iItemOrderController';
import { Request, Response } from 'express';
import CreateItemOrderService from '../Services/CreateItemOrderService';
import ListItemOrderService from '../Services/ListItemOrderService';
import ShowItemOrderService from '../Services/ShowItemOrderService';

export default class ItemOrderController implements iItemOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const { id } = request.params;
    const order = Number(id);
    const listOrder = new ListItemOrderService();

    const items = await listOrder.execute({ page, limit, order });

    return response.json(items);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showItemOrder = new ShowItemOrderService();
    const item = await showItemOrder.execute({
      id: Number(id),
    });
    return response.json(item);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { menu, quantity, total } = request.body;
    const { id } = request.params;

    const createItemOrder = new CreateItemOrderService();

    const item = await createItemOrder.execute({
      menu,
      quantity,
      order: Number(id),
      total,
    });

    return response.status(201).json(item);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;

    // const { items, obs, status } = request.body;

    // const updateOrder = new UpdateOrderService();

    // let updatedOrder: iUpdatedOrder = {
    //   id: Number(id),
    //   items: items && items,
    //   obs: obs && obs,
    //   status: status && status,
    // };

    // const order = await updateOrder.execute(updatedOrder);
    // return response.json(order);
    return response.json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const deleteOrder = new DeleteOrderService();
    // await deleteOrder.execute({ id: Number(id) });
    // return response.status(204).json([]);
    return response.status(204).json([]);
  }
}
