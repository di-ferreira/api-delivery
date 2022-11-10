import 'reflect-metadata';
import app from './app';
import AppDataSource from './DataSource';

const port = 3333;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initilize');
    app.listen(port, () => console.log(`🏆 server running on port ${port}`));
  })
  .catch((err) => {
    console.log('Error:', err);
  });
