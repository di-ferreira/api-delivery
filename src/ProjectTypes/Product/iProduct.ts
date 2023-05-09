import { SearchParams } from '..';

export interface iCreateProduct {
  name: string;
  costPrice: number;
  describe?: string;
  minStock: number;
  stock: number;
}

export interface iShowProduct {
  id: number;
}

export interface iDeleteProduct {
  id: number;
}

export interface iUpdatedProduct {
  id: number;
  name?: string;
  costPrice?: number;
  describe?: string;
  minStock?: number;
  stock?: number;
}

export interface iProduct {
  id: number;
  name: string;
  costPrice: number;
  describe: string;
  minStock: number;
  stock: number;
  createdAt: Date;
  updateAt: Date;
}

export interface iProductList {
  per_page: number;
  total: number;
  current_page: number;
  data: iProduct[];
}
export interface iProductRepository {
  findAll({ page, limit }: SearchParams): Promise<iProductList>;
  findByName(name: string): Promise<iProduct[] | null>;
  findById(id: number): Promise<iProduct | null>;
  create(data: iCreateProduct): Promise<iProduct>;
  save(customer: iProduct): Promise<iProduct>;
  remove(customer: iProduct): Promise<void>;
}