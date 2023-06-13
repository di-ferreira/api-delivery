import AddressRoute from '@modules/Address/Routes';
import CustomerRoute from '@modules/Customer/Routes';
import MenuRoute from '@modules/Menu/Routes';
import OrderRoute from '@modules/Order/Routes';
import ProductRoute from '@modules/Product/Routes';
import TypeMenuRoute from '@modules/TypeMenu/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customers', CustomerRoute);
routes.use('/addressess', AddressRoute);
routes.use('/products', ProductRoute);
routes.use('/types-menu', TypeMenuRoute);
routes.use('/menus', MenuRoute);
routes.use('/orders', OrderRoute);
export default routes;
