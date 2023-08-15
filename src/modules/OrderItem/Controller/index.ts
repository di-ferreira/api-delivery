import { iUpdatedItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iItemOrderController } from '@ProjectTypes/ItemOrder/iItemOrderController';
import { Request, Response } from 'express';
import CreateItemOrderService from '../Services/CreateItemOrderService';
import DeleteItemOrderService from '../Services/DeleteItemOrderService';
import ListItemOrderService from '../Services/ListItemOrderService';
import ShowItemOrderService from '../Services/ShowItemOrderService';
import { UpdateItemOrderService } from '../Services/UpdateItemOrderService';

export default class ItemOrderController implements iItemOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const order = Number(id);
    const listItemOrder = new ListItemOrderService();

    const items = await listItemOrder.execute({ order });

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
    const { id, id_order } = request.params;

    const { menu, quantity } = request.body;

    const updateItemOrder = new UpdateItemOrderService();

    let updatedItemOrder: iUpdatedItemOrder = {
      id: Number(id),
      menu,
      quantity,
    };

    const itemOrder = await updateItemOrder.execute(updatedItemOrder);
    return response.json(itemOrder);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteItemOrder = new DeleteItemOrderService();
    const result = await deleteItemOrder.execute({ id: Number(id) });
    return response.status(204).json(result);
  }
}
