import { Router } from 'express';
import TypeMenuController from '../TypeMenuController';

const Controller = new TypeMenuController();

const TypeMenuRoute = Router();

TypeMenuRoute.post('/', Controller.create);
TypeMenuRoute.get('/', Controller.index);
TypeMenuRoute.get('/:id', Controller.show);
TypeMenuRoute.put('/:id', Controller.update);
TypeMenuRoute.delete('/:id', Controller.delete);

export default TypeMenuRoute;
