import AddressRoute from '@modules/Address/Routes';
import CustomerRoute from '@modules/Customer/Routes';
import ProductRoute from '@modules/Product/Routes';
import TypeMenuRoute from '@modules/TypeMenu/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customer', CustomerRoute);
routes.use('/address', AddressRoute);
routes.use('/product', ProductRoute);
routes.use('/type-menu', TypeMenuRoute);

export default routes;
