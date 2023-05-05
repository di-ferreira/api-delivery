import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import CustomerController from '../CustomerController';

const Controller = new CustomerController();

const CustomerRoute = Router();

CustomerRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  Controller.create
);
CustomerRoute.get('/', Controller.index);
CustomerRoute.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().id().required() } }),
  Controller.show
);
CustomerRoute.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().id().required() },
  }),
  Controller.update
);
CustomerRoute.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().id().required() } }),
  Controller.delete
);

export default CustomerRoute;
