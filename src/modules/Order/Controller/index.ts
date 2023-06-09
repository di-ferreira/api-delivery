import { iCreateOrder } from '@ProjectTypes/Order/iOrder';
import { iOrderController } from '@ProjectTypes/Order/iOrderController';
import { Request, Response } from 'express';
import CreateOrderService from '../Services/CreateOrderService';
import DeleteOrderService from '../Services/DeleteOrderService';
import ListOrderService from '../Services/ListOrderService';
import ShowOrderService from '../Services/ShowOrderService';

export default class OrderController implements iOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const listOrder = new ListOrderService();
    const orders = await listOrder.execute({ page, limit });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id: Number(id) });
    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer, items, status, obs } = request.body;
    const createOrder = new CreateOrderService();

    let newMenu: iCreateOrder = {
      customer,
      items,
      status,
      obs,
    };

    const menu = await createOrder.execute(newMenu);

    return response.status(201).json(menu);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;

    // const { name, description, products, profit, price, type, active } =
    //   request.body;

    // const createMenu = new UpdateMenuService();

    // let updatedMenu: iUpdatedMenu = {
    //   id: Number(id),
    //   name: name && name,
    //   products: products && products,
    //   type: type && type,
    //   active: active && active,
    //   description: description && description,
    //   price: price && price,
    //   profit: profit && profit,
    // };

    // const menu = await createMenu.execute(updatedMenu);
    // return response.json(menu);
    return response.json({});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrder = new DeleteOrderService();
    await deleteOrder.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
