import { Request, Response } from 'express';

export interface iController {
  index(request: Request, response: Response): Promise<Response>;
  show(request: Request, response: Response): Promise<Response>;
  create(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
  delete(request: Request, response: Response): Promise<Response>;
}
