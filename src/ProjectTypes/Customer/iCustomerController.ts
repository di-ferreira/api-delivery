import { Request, Response } from 'express';
import { iController } from '..';

export interface iCustomerController extends iController {
  showByPhone(request: Request, response: Response): Promise<Response>;
}
