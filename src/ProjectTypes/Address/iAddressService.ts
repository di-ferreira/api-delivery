import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { SearchParams } from '..';

export interface iCreateAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  customer: iCustomer | number;
}
export interface iExistAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  customer: iCustomer;
}

export interface iShowAddress {
  id: number;
}

export interface iDeleteAddress {
  id: number;
}

export interface iShowAddressByCustomer {
  customer_id: number;
}

export interface iUpdatedAddress {
  id: number;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  customer: iCustomer;
}

export interface iAddress {
  id: number;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  customer: iCustomer;
}

export interface iAddressList {
  per_page: number;
  total: number;
  current_page: number;
  data: iAddress[];
}

export interface iAddressRepository {
  findAll({ page, limit }: SearchParams): Promise<iAddressList>;
  findById(id: number): Promise<iAddress | null>;
  findByCustomer(id_customer: number): Promise<iAddress[] | null>;
  findExists(address: iCreateAddress): Promise<iAddress | null>;
  create(data: iCreateAddress): Promise<iAddress>;
  save(address: iAddress): Promise<iAddress>;
  remove(address: iAddress): Promise<void>;
}
