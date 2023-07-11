import { Router } from 'express';
import PaymentMethodController from '../Controller';

const Controller = new PaymentMethodController();

const PaymentMethodRoute = Router();

PaymentMethodRoute.post('/', Controller.create);
PaymentMethodRoute.get('/', Controller.index);
PaymentMethodRoute.get('/:id', Controller.show);
PaymentMethodRoute.put('/:id', Controller.update);
PaymentMethodRoute.delete('/:id', Controller.delete);

export default PaymentMethodRoute;
