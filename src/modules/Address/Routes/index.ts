import { Router } from 'express';
import AddressController from '../AddressController';

const Controller = new AddressController();

const AddressRoute = Router();

AddressRoute.post('/', Controller.create);

AddressRoute.get('/', Controller.index);

AddressRoute.get('/:id', Controller.show);

AddressRoute.get('/customer/:id_customer', Controller.indexByCustomer);

//TODO Update Address
AddressRoute.put('/:id', Controller.update);
//TODO Delete Address
// AddressRoute.delete(
//   '/:id',
//   celebrate({ [Segments.PARAMS]: { id: Joi.string().id().required() } }),
//   Controller.delete
// );

export default AddressRoute;
