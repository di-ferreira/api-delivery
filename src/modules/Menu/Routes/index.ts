import { Router } from 'express';
import MenuController from '../MenuController';

const Controller = new MenuController();

const MenuRoute = Router();

MenuRoute.post('/', Controller.create);
MenuRoute.get('/', Controller.index);
MenuRoute.get('/:id', Controller.show);
MenuRoute.put('/:id', Controller.update);
MenuRoute.delete('/:id', Controller.delete);

export default MenuRoute;
