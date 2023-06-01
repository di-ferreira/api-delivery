import { iCreateMenu, iUpdatedMenu } from '@ProjectTypes/Menu/iMenu';
import { iMenuController } from '@ProjectTypes/Menu/iMenuController';
import { Request, Response } from 'express';
import CreateMenuService from '../Services/CreateMenuService';
import DeleteMenuService from '../Services/DeleteMenuService';
import ListMenuService from '../Services/ListMenuService';
import ShowMenuService from '../Services/ShowMenuService';
import UpdateMenuService from '../Services/UpdateMenuService';

export default class MenuController implements iMenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const active = request.query.active;
    const listMenu = new ListMenuService();
    const menus = await listMenu.execute({ page, limit, active });

    return response.json(menus);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showMenu = new ShowMenuService();
    const menu = await showMenu.execute({ id: Number(id) });
    return response.json(menu);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, products, profit, price, type, active } =
      request.body;
    const createMenu = new CreateMenuService();

    let newMenu: iCreateMenu = {
      name,
      active,
      products,
      type,
      description: description && description,
      price: price && price,
      profit: profit && profit,
    };

    const menu = await createMenu.execute(newMenu);

    return response.status(201).json(menu);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, description, products, profit, price, type, active } =
      request.body;

    const createMenu = new UpdateMenuService();

    let updatedMenu: iUpdatedMenu = {
      id: Number(id),
      name: name && name,
      products: products && products,
      type: type && type,
      active: active && active,
      description: description && description,
      price: price && price,
      profit: profit && profit,
    };

    const menu = await createMenu.execute(updatedMenu);
    return response.json(menu);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMenu = new DeleteMenuService();
    await deleteMenu.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
