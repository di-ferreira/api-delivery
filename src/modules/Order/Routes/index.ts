import PaymentRoute from '@modules/Payment/Routes';
import { Router } from 'express';
import OrderController from '../Controller';

const Controller = new OrderController();

const OrderRoute = Router();

OrderRoute.get('/:id', Controller.show);
OrderRoute.use('/:id/payments', PaymentRoute);
OrderRoute.put('/:id', Controller.update);
OrderRoute.delete('/:id', Controller.delete);
OrderRoute.post('/', Controller.create);
OrderRoute.get('/', Controller.index);

export default OrderRoute;
