import { iMenu } from '@ProjectTypes/Menu/iMenu';
import { iOrder } from '@ProjectTypes/Order/iOrder';

export interface iCreateItemOrder {
  total?: number;
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

export interface SearchParamsItemOrder {
  page: number;
  limit: number;
  order: iOrder;
}

export interface iItemOrderRepository {
  findAll({
    page,
    limit,
    order,
  }: SearchParamsItemOrder): Promise<iItemOrderList>;
  findByOrder(order: iOrder): Promise<iItemOrder[]>;
  findById(id: number): Promise<iItemOrder>;
  create(data: iCreateItemOrder): Promise<iItemOrder>;
  save(itemOrder: iItemOrder): Promise<iItemOrder>;
  remove(itemOrder: iItemOrder): Promise<void>;
}
