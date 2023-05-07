import { Request, Response } from 'express';
import { iController } from '..';

export interface iAddressController extends iController {
  indexByCustomer(request: Request, response: Response): Promise<Response>;
}
