import CustomerRoute from '@modules/Customer/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customer', CustomerRoute);

export default routes;
