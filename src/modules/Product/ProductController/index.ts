import { iProductController } from '@ProjectTypes/Product/iProductController';
import { Request, Response } from 'express';
import CreateProductService from '../Services/CreateProductService';

export default class ProductController implements iProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const page = request.query.page ? Number(request.query.page) : 1;
    // const limit = request.query.limit ? Number(request.query.limit) : 15;
    // const listProduct = new ListProductService();
    // const products = await listProduct.execute({ page, limit });

    // return response.json(products);
    return response.json('');
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // const { phoneid } = request.params;
    // const showProduct = new ShowProductService();
    // const product = await showProduct.execute({ phoneid: phoneid });
    // return response.json(product);
    return response.json('');
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { costPrice, minStock, name, stock, describe } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      costPrice,
      minStock,
      name,
      stock,
      describe,
    });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const { name, phone } = request.body;
    // const updateProduct = new UpdateProductService();
    // const product = await updateProduct.execute({
    //   id: Number(id),
    //   name,
    //   phone,
    // });
    // return response.json(product);
    return response.json('');
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    // const deleteProduct = new DeleteProductService();
    // await deleteProduct.execute({ id: Number(id) });
    return response.json([]);
  }
}
