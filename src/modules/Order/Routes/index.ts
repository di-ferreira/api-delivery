import { Router } from 'express';
import OrderController from '../Controller';

const Controller = new OrderController();

const OrderRoute = Router();

OrderRoute.post('/', Controller.create);
OrderRoute.get('/', Controller.index);
OrderRoute.get('/:id', Controller.show);
OrderRoute.put('/:id', Controller.update);
OrderRoute.delete('/:id', Controller.delete);

export default OrderRoute;
