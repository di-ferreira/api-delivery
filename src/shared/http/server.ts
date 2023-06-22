import AppDataSource from '@shared/infra/typeorm';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import 'reflect-metadata';
import app from './app';

let port = 3000;

const DATA = { PORTA: 3000 };
const FILE = './src/AppConfig.json';

AppDataSource.initialize()
  .then(() => {
    if (
      existsSync(FILE) &&
      JSON.parse(readFileSync(FILE, { encoding: 'utf-8' })).PORTA
    ) {
      port = JSON.parse(readFileSync(FILE, { encoding: 'utf-8' })).PORTA;
    } else {
      let fileWrite = { ...DATA };
      writeFileSync(FILE, JSON.stringify(fileWrite));
      port = DATA.PORTA;
    }

    app.listen(port, () => console.log(`🏆 server running on port ${port}`));
  })
  .catch((err) => {
    console.log('Error:', err);
  });
