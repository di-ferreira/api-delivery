import { iAddress } from '@ProjectTypes/Address/iAddressService';
import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { SearchParams } from '..';

export enum iStatusOrder {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}

export interface iCreateOrder {
  status: iStatusOrder;
  customer: iCustomer;
  items: iItemOrder[];
  deliveryAddress?: iAddress;
  obs?: string;
}
export interface iSaveOrder {
  total: number;
  status: iStatusOrder;
  customer: iCustomer;
  items: iItemOrder[];
  deliveryAddress?: iAddress;
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
  status?: iStatusOrder;
  items?: iItemOrder[];
  deliveryAddress?: iAddress;
  obs?: string;
}

export interface iOrder {
  id: number;
  total: number;
  customer: iCustomer;
  status: iStatusOrder;
  items: iItemOrder[];
  deliveryAddress?: iAddress;
  obs?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export type SearchParamsOrder = {
  page: number;
  limit: number;
  param: any;
};

export interface iOrderList {
  per_page: number;
  total: number;
  current_page: number;
  data: iOrder[];
}
export interface iOrderRepository {
  findAll({ page, limit }: SearchParams): Promise<iOrderList>;
  findById(orderID: number): Promise<iOrder | null>;
  findOrderOpenByCustomer(customer: iCustomer): Promise<iOrder | null>;
  findByCustomer({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList | null>;
  findByStatus({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList | null>;
  create(data: iSaveOrder): Promise<iOrder>;
  save(order: iOrder): Promise<iOrder>;
  remove(order: iOrder): Promise<void>;
}
