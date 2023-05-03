import { DataSource, DataSourceOptions } from 'typeorm';
import { Cardapio } from '../entity/Cardapio';
import { Cliente } from '../entity/Cliente';
import { Enderecos } from '../entity/Enderecos';
import { PedidoCardapio } from '../entity/PedidoCardapio';
import { Pedidos } from '../entity/Pedidos';
import { Produto } from '../entity/Produto';
import { TipoCardapio } from '../entity/TipoCardapio';

let DSConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: './src/db/api_delivery.sqlite',
  entities: [
    Cardapio,
    Cliente,
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
