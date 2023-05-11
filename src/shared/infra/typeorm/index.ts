import { Address } from '@modules/Address/Entity';
import { Customer } from '@modules/Customer/Entity';
import { Product } from '@modules/Product/Entity';
import { TypeMenu } from '@modules/TypeMenu/Entity';
import { DataSource, DataSourceOptions } from 'typeorm';

let DSConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: './src/db/api_delivery.sqlite',
  entities: [
    // Cardapio,
    Customer,
    Address,
    // PedidoCardapio,
    // Pedidos,
    Product,
    TypeMenu,
  ],
  // migrations: ['./src/database/migrations/*.ts'],
  synchronize: true,
};

const AppDataSource = new DataSource(DSConfig);

export default AppDataSource;
