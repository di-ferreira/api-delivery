import ItemOrderRoute from '@modules/OrderItem/Routes';
import { Router } from 'express';
import OrderController from '../Controller';

const Controller = new OrderController();

const OrderRoute = Router();

OrderRoute.post('/', Controller.create);
OrderRoute.get('/', Controller.index);
OrderRoute.get('/:id', Controller.show);
OrderRoute.use('/:id', ItemOrderRoute);
OrderRoute.put('/:id', Controller.update);
OrderRoute.delete('/:id', Controller.delete);

export default OrderRoute;
