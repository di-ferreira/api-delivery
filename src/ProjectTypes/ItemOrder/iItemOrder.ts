import { iMenu } from '@ProjectTypes/Menu/iMenu';
import { iOrder } from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '..';

export interface iCreateItemOrder {
  total: number;
  quantity?: number;
  menu: iMenu;
  order: iOrder;
}

export interface iShowItemOrder {
  id: number;
}

export interface iDeleteItemOrder {
  id: number;
}

export interface iUpdatedItemOrder {
  id: number;
  total?: number;
  quantity?: number;
  menu?: iMenu;
}

export interface iItemOrder {
  id: number;
  total: number;
  quantity: number;
  menu: iMenu;
  order: iOrder;
  createdAt?: Date;
  updateAt?: Date;
}

export interface iItemOrderList {
  per_page: number;
  total: number;
  current_page: number;
  data: iItemOrder[];
}
export interface iItemOrderRepository {
  findAll({ page, limit }: SearchParams): Promise<iItemOrderList>;
  findByOrder(order_id: number): Promise<iItemOrder[] | null>;
  findById(id: number): Promise<iItemOrder | null>;
  create(data: iCreateItemOrder): Promise<iItemOrder>;
  save(customer: iItemOrder): Promise<iItemOrder>;
  remove(customer: iItemOrder): Promise<void>;
}
