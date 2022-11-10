import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './src/db/api_delivery.sqlite',
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  synchronize: true,
});

export default AppDataSource;
