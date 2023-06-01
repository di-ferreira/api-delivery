import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { SearchParams } from '..';

export enum iStatusOrder {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}

export interface iCreateOrder {
  total: number;
  status: iStatusOrder;
  customer: iCustomer;
  obs?: string;
}

export interface iShowOrder {
  id: number;
}

export interface iDeleteOrder {
  id: number;
}

export interface iUpdatedOrder {
  id: number;
  total?: number;
  status?: iStatusOrder;
  obs?: string;
}

export interface iOrder {
  id: number;
  total: number;
  customer: iCustomer;
  status: iStatusOrder;
  obs?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface iOrderList {
  per_page: number;
  total: number;
  current_page: number;
  data: iOrder[];
}
export interface iOrderRepository {
  findAll({ page, limit }: SearchParams): Promise<iOrderList>;
  findById(orderID: number): Promise<iOrder[] | null>;
  findByCustomer(customerID: number): Promise<iOrder[] | null>;
  findByStatus(status: iStatusOrder): Promise<iOrder | null>;
  create(data: iCreateOrder): Promise<iOrder>;
  save(customer: iOrder): Promise<iOrder>;
  remove(customer: iOrder): Promise<void>;
}
