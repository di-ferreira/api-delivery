import { Router } from 'express';
import PaymentController from '../Controller';

const Controller = new PaymentController();

const PaymentRoute = Router();

PaymentRoute.post('/', Controller.create);
PaymentRoute.get('/', Controller.index);
PaymentRoute.get('/:id', Controller.show);
PaymentRoute.put('/:id', Controller.update);
PaymentRoute.delete('/:id', Controller.delete);

export default PaymentRoute;
