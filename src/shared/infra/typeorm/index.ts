import { Customer } from '@modules/Customer/Entity';
import { Cardapio } from 'src/entities/Cardapio';
import { Enderecos } from 'src/entities/Enderecos';
import { PedidoCardapio } from 'src/entities/PedidoCardapio';
import { Pedidos } from 'src/entities/Pedidos';
import { Produto } from 'src/entities/Produto';
import { TipoCardapio } from 'src/entities/TipoCardapio';
import { DataSource, DataSourceOptions } from 'typeorm';

let DSConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: './src/db/api_delivery.sqlite',
  entities: [
    Cardapio,
    Customer,
    Enderecos,
    PedidoCardapio,
    Pedidos,
    Produto,
    TipoCardapio,
  ],
  migrations: ['./src/database/migrations/*.ts'],
  synchronize: true,
};

const AppDataSource = new DataSource(DSConfig);

export default AppDataSource;
