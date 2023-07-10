import { Router } from 'express';
import CashRegisterController from '../Controller';

const Controller = new CashRegisterController();

const CashRegisterRoute = Router();

CashRegisterRoute.get('/:id', Controller.show);
CashRegisterRoute.put('/:id', Controller.update);
CashRegisterRoute.delete('/:id', Controller.delete);
CashRegisterRoute.post('/', Controller.create);
CashRegisterRoute.get('/', Controller.index);

export default CashRegisterRoute;
