import { Router } from 'express';
import ItemOrderController from '../Controller';

const Controller = new ItemOrderController();

const ItemOrderRoute = Router();

ItemOrderRoute.post('/:id/items', Controller.create);
ItemOrderRoute.get('/:id/items', Controller.index);
ItemOrderRoute.get('/:id_order/items/:id', Controller.show);
ItemOrderRoute.put('/:id_order/items/:id', Controller.update);
ItemOrderRoute.delete('/:id_order/items/:id', Controller.delete);

export default ItemOrderRoute;
