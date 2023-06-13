import { iProduct } from '@ProjectTypes/Product/iProduct';
import { iTypeMenu } from '@ProjectTypes/TypeMenu/iTypeMenu';
import { SearchParams } from '..';

export interface iCreateMenu {
  name: string;
  profit?: number;
  price?: number;
  description?: string;
  active: boolean;
  type: iTypeMenu;
  products: iProduct[];
}

export interface iShowMenu {
  id: number;
}

export interface iDeleteMenu {
  id: number;
}

export interface iUpdatedMenu {
  id: number;
  name?: string;
  profit?: number;
  price?: number;
  description?: string;
  active?: boolean;
  type?: iTypeMenu;
  products?: iProduct[];
}

export interface iMenu {
  id: number;
  name: string;
  price: number;
  description?: string;
  active: boolean;
  type: iTypeMenu;
  products: iProduct[];
  createdAt: Date;
  updateAt: Date;
}

export interface iMenuList {
  per_page: number;
  total: number;
  current_page: number;
  data: iMenu[];
}

export interface SearchParamsMenu {
  page: number;
  limit: number;
  active: any;
}
export interface iMenuRepository {
  findAll({ page, limit }: SearchParams): Promise<iMenuList>;
  findByActive(filter: SearchParamsMenu): Promise<iMenuList>;
  findByType(typeID: number): Promise<iMenu[] | null>;
  findByProduct(productID: number): Promise<iMenu[] | null>;
  findById(id: number): Promise<iMenu | null>;
  create(data: iCreateMenu): Promise<iMenu>;
  save(customer: iUpdatedMenu): Promise<iMenu>;
  remove(customer: iMenu): Promise<void>;
}
