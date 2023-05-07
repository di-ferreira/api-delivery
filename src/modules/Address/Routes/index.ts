import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import AddressController from '../AddressController';

const Controller = new AddressController();

const AddressRoute = Router();

AddressRoute.post('/', Controller.create);

AddressRoute.get('/', Controller.index);

AddressRoute.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().id().required() } }),
  Controller.show
);

AddressRoute.get(
  '/customer/:id_customer',
  celebrate({
    [Segments.PARAMS]: { id_customer: Joi.string().required() },
  }),
  Controller.indexByCustomer
);

// AddressRoute.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       phone: Joi.string().required(),
//     },
//     [Segments.PARAMS]: { id: Joi.string().id().required() },
//   }),
//   Controller.update
// );
// AddressRoute.delete(
//   '/:id',
//   celebrate({ [Segments.PARAMS]: { id: Joi.string().id().required() } }),
//   Controller.delete
// );

export default AddressRoute;
