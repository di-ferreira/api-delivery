import { DataSource } from 'typeorm';
import { Cardapio } from '../entity/Cardapio';
import { Cliente } from '../entity/Cliente';
import { Enderecos } from '../entity/Enderecos';
import { PedidoCardapio } from '../entity/PedidoCardapio';
import { Pedidos } from '../entity/Pedidos';
import { Produto } from '../entity/Produto';
import { TipoCardapio } from '../entity/TipoCardapio';

const AppDataSource = new DataSource({
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
});

export default AppDataSource;
