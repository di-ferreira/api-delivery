import ItemOrderRoute from '@modules/OrderItem/Routes';
import { Router } from 'express';
import OrderController from '../Controller';

const Controller = new OrderController();

const OrderRoute = Router();

OrderRoute.get('/:id', Controller.show);
OrderRoute.use('/:id/item', ItemOrderRoute);
OrderRoute.put('/:id', Controller.update);
OrderRoute.delete('/:id', Controller.delete);
OrderRoute.post('/', Controller.create);
OrderRoute.get('/', Controller.index);

export default OrderRoute;
