import { Router } from 'express';
import ItemOrderController from '../Controller';

const Controller = new ItemOrderController();

const ItemOrderRoute = Router();

ItemOrderRoute.post('/', Controller.create);
ItemOrderRoute.get('/', Controller.index);
ItemOrderRoute.get('/:id', Controller.show);
ItemOrderRoute.put('/:id', Controller.update);
ItemOrderRoute.delete('/:id', Controller.delete);

export default ItemOrderRoute;
