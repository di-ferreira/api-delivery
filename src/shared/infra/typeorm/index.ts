import { Address } from '@modules/Address/Entity';
import { CashRegister } from '@modules/CashRegister/Entity';
import { Customer } from '@modules/Customer/Entity';
import { Menu } from '@modules/Menu/Entity';
import { Order } from '@modules/Order/Entity';
import { ItemOrder } from '@modules/OrderItem/Entity';
import { Payment } from '@modules/Payment/Entity';
import { PaymentMethod } from '@modules/PaymentMethod/Entity';
import { Product } from '@modules/Product/Entity';
import { TypeMenu } from '@modules/TypeMenu/Entity';
import { DataSource, DataSourceOptions } from 'typeorm';

let DSConfig: DataSourceOptions = {
  type: 'mariadb',
  database: 'api_delivery',
  host: 'localhost',
  password: '',
  port: 3306,
  username: 'root',
  // database: './src/db/api_delivery.sqlite',
  entities: [
    Customer,
    Address,
    TypeMenu,
    Menu,
    Product,
    Order,
    ItemOrder,
    CashRegister,
    PaymentMethod,
    Payment,
  ],
  // migrations: ['./src/database/migrations/*.ts'],
  synchronize: true,
};

const AppDataSource = new DataSource(DSConfig);

export default AppDataSource;
