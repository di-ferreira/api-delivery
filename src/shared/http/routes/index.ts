import AddressRoute from '@modules/Address/Routes';
import CustomerRoute from '@modules/Customer/Routes';
import MenuRoute from '@modules/Menu/Routes';
import OrderRoute from '@modules/Order/Routes';
import ProductRoute from '@modules/Product/Routes';
import TypeMenuRoute from '@modules/TypeMenu/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customer', CustomerRoute);
routes.use('/address', AddressRoute);
routes.use('/product', ProductRoute);
routes.use('/type-menu', TypeMenuRoute);
routes.use('/menu', MenuRoute);
routes.use('/order', OrderRoute);
export default routes;
