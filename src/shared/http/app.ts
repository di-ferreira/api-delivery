import AppError from '@shared/errors/AppError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/v1', routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error!' });
  }
);

export default app;
