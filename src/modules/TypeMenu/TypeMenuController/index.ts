import { iTypeMenuController } from '@ProjectTypes/TypeMenu/iTypeMenuController';
import { Request, Response } from 'express';
import CreateTypeMenuService from '../Services/CreateTypeMenuService';
import DeleteTypeMenuService from '../Services/DeleteTypeMenuService';
import ListTypeMenuService from '../Services/ListTypeMenuService';
import ShowTypeMenuService from '../Services/ShowTypeMenuService';
import UpdateTypeMenuService from '../Services/UpdateTypeMenuService';

export default class TypeMenuController implements iTypeMenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listTypeMenu = new ListTypeMenuService();
    const typeMenus = await listTypeMenu.execute({ page, limit });

    return response.json(typeMenus);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTypeMenu = new ShowTypeMenuService();
    const typeMenu = await showTypeMenu.execute({ id: Number(id) });
    return response.json(typeMenu);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createTypeMenu = new CreateTypeMenuService();
    const typeMenu = await createTypeMenu.execute({
      name,
      description,
    });
    return response.status(201).json(typeMenu);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description, name } = request.body;
    const createTypeMenu = new UpdateTypeMenuService();
    const typeMenu = await createTypeMenu.execute({
      id: Number(id),
      description,
      name,
    });
    return response.json(typeMenu);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteTypeMenu = new DeleteTypeMenuService();
    await deleteTypeMenu.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
