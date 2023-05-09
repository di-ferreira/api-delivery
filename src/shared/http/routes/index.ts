import AddressRoute from '@modules/Address/Routes';
import CustomerRoute from '@modules/Customer/Routes';
import ProductRoute from '@modules/Product/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customer', CustomerRoute);
routes.use('/address', AddressRoute);
routes.use('/product', ProductRoute);

export default routes;
