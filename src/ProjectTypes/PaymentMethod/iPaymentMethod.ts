import { SearchParams } from '..';

export interface iCreatePaymentMethod {
  name: string;
}

export interface iShowPaymentMethod {
  id: number;
}

export interface iDeletePaymentMethod {
  id: number;
}

export interface iUpdatedPaymentMethod {
  id: number;
  name?: string;
}

export interface iPaymentMethod {
  id: number;
  name: string;
  createdAt?: Date;
  updateAt?: Date;
}

export type SearchParamsPaymentMethod = {
  page: number;
  limit: number;
  param: any;
};

export interface iPaymentMethodList {
  per_page: number;
  total: number;
  current_page: number;
  data: iPaymentMethod[];
}
export interface iPaymentMethodRepository {
  findAll({ page, limit }: SearchParams): Promise<iPaymentMethodList>;
  findByName(value: SearchParamsPaymentMethod): Promise<iPaymentMethodList>;
  findById(id: number): Promise<iPaymentMethod | null>;
  create(data: iCreatePaymentMethod): Promise<iPaymentMethod>;
  save(paymentMethod: iPaymentMethod): Promise<iPaymentMethod>;
  remove(paymentMethod: iPaymentMethod): Promise<void>;
}
