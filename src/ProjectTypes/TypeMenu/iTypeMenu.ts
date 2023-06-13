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
  createdAt?: Date;
  updateAt?: Date;
}

export interface iTypeMenuList {
  per_page: number;
  total: number;
  current_page: number;
  data: iTypeMenu[];
}
export interface iTypeMenuRepository {
  findAll({ page, limit }: SearchParams): Promise<iTypeMenuList>;
  findByType(typeName: string): Promise<iTypeMenu[] | null>;
  findById(id: number): Promise<iTypeMenu | null>;
  create(data: iCreateTypeMenu): Promise<iTypeMenu>;
  save(typeMenu: iTypeMenu): Promise<iTypeMenu>;
  remove(typeMenu: iTypeMenu): Promise<void>;
}
