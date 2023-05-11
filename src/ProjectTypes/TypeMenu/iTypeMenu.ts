import { SearchParams } from '..';

export interface iCreateTypeMenu {
  name: string;
  description?: string;
}

export interface iShowTypeMenu {
  id: number;
}

export interface iDeleteTypeMenu {
  id: number;
}

export interface iUpdatedTypeMenu {
  id: number;
  name?: string;
  description?: string;
}

export interface iTypeMenu {
  id: number;
  name: string;
  description?: string;
}

export interface iTypeMenuList {
  per_page: number;
  total: number;
  current_page: number;
  data: iTypeMenu[];
}
export interface iTypeMenuRepository {
  findAll({ page, limit }: SearchParams): Promise<iTypeMenuList>;
  findByType(typName: string): Promise<iTypeMenu[] | null>;
  findById(id: number): Promise<iTypeMenu | null>;
  create(data: iCreateTypeMenu): Promise<iTypeMenu>;
  save(customer: iTypeMenu): Promise<iTypeMenu>;
  remove(customer: iTypeMenu): Promise<void>;
}
