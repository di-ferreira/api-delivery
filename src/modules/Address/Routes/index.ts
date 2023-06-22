import { Router } from 'express';
import AddressController from '../AddressController';

const Controller = new AddressController();

const AddressRoute = Router();

AddressRoute.post('/:id_customer/addresses/', Controller.create);

AddressRoute.get('/:id_customer/addresses/:id', Controller.show);

AddressRoute.get('/:id_customer/addresses', Controller.indexByCustomer);

AddressRoute.put('/:id_customer/addresses/:id', Controller.update);

AddressRoute.delete('/:id_customer/addresses/:id', Controller.delete);

export default AddressRoute;
