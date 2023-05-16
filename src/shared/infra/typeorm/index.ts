import { Address } from '@modules/Address/Entity';
import { Customer } from '@modules/Customer/Entity';
import { Menu } from '@modules/Menu/Entity';
import { Order } from '@modules/Order/Entity';
import { ItemOrder } from '@modules/OrderItem/Entity';
import { Product } from '@modules/Product/Entity';
import { TypeMenu } from '@modules/TypeMenu/Entity';
import { DataSource, DataSourceOptions } from 'typeorm';

let DSConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: './src/db/api_delivery.sqlite',
  entities: [Customer, Address, TypeMenu, Menu, Product, Order, ItemOrder],
  // migrations: ['./src/database/migrations/*.ts'],
  synchronize: true,
};

const AppDataSource = new DataSource(DSConfig);

export default AppDataSource;
