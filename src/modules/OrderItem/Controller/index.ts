import { iCreateItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iItemOrderController } from '@ProjectTypes/ItemOrder/iItemOrderController';
import { Request, Response } from 'express';
import CreateItemOrderService from '../Services/CreateItemOrderService';

export default class ItemOrderController implements iItemOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const page = Number(request.query.page);
    // const limit = Number(request.query.limit);
    // const listOrder = new ListOrderService();

    // const orders = await listOrder.execute({ page, limit });

    // return response.json(orders);
    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    //   const { id } = request.params;
    //   const showOrder = new ShowOrderService();
    //   const order = await showOrder.execute({ id: Number(id) });
    //   return response.json(order);
    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { menu, order, quantity, total } = request.body;

    const createItemOrder = new CreateItemOrderService();

    let newItem: iCreateItemOrder = {
      menu,
      order,
      quantity,
      total,
    };

    const item = await createItemOrder.execute(newItem);

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
