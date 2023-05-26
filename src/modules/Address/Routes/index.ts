import { Router } from 'express';
import AddressController from '../AddressController';

const Controller = new AddressController();

const AddressRoute = Router();

AddressRoute.post('/', Controller.create);

AddressRoute.get('/', Controller.index);

AddressRoute.get('/:id', Controller.show);

AddressRoute.get('/customer/:id_customer', Controller.indexByCustomer);

AddressRoute.put('/:id', Controller.update);

AddressRoute.delete('/:id', Controller.delete);

export default AddressRoute;
