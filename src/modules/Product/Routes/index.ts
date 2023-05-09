import { Router } from 'express';
import ProductController from '../ProductController';

const Controller = new ProductController();

const ProductRoute = Router();

ProductRoute.post('/', Controller.create);
ProductRoute.get('/', Controller.index);
ProductRoute.get('/:id', Controller.show);
ProductRoute.put('/:id', Controller.update);
ProductRoute.delete('/:id', Controller.delete);

export default ProductRoute;
