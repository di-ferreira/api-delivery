import { iOrder } from '@ProjectTypes/Order/iOrder';
import { iPaymentMethod } from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import { SearchParams } from '..';

export interface iCreatePayment {
  value: number;
  method: iPaymentMethod;
  order: iOrder;
}

export interface iShowPayment {
  id: number;
}

export interface iDeletePayment {
  id: number;
}

export interface iUpdatedPayment {
  id: number;
  value?: number;
  method?: iPaymentMethod;
  order: iOrder;
}

export interface iPayment {
  id: number;
  value: number;
  method: iPaymentMethod;
  order: iOrder;
  createdAt?: Date;
  updateAt?: Date;
}

export type SearchParamsPayment = {
  page: number;
  limit: number;
  param: any;
};

export interface iPaymentList {
  per_page: number;
  total: number;
  current_page: number;
  data: iPayment[];
}
export interface iPaymentRepository {
  findAll({ page, limit }: SearchParams): Promise<iPaymentList>;
  findByOrder(order: iOrder): Promise<iPayment[]>;
  findById(id: number): Promise<iPayment | null>;
  create(data: iCreatePayment): Promise<iPayment>;
  save(paymentMethod: iPayment): Promise<iPayment>;
  remove(paymentMethod: iPayment): Promise<void>;
}
