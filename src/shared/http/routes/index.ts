import CashRegisterRoute from '@modules/CashRegister/Routes';
import CustomerRoute from '@modules/Customer/Routes';
import MenuRoute from '@modules/Menu/Routes';
import OrderRoute from '@modules/Order/Routes';
import ItemOrderRoute from '@modules/OrderItem/Routes';
import PaymentMethodRoute from '@modules/PaymentMethod/Routes';
import ProductRoute from '@modules/Product/Routes';
import TypeMenuRoute from '@modules/TypeMenu/Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customers', CustomerRoute);
// routes.use('/addressess', AddressRoute);
routes.use('/products', ProductRoute);
routes.use('/types-menu', TypeMenuRoute);
routes.use('/menus', MenuRoute);
routes.use('/orders', OrderRoute);
routes.use('/orders', ItemOrderRoute);
routes.use('/cash-registers', CashRegisterRoute);
routes.use('/payment-methods', PaymentMethodRoute);
export default routes;
