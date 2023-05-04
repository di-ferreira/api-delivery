export interface iCreateCustomer {
  name: string;
  phone: string;
}

export interface iShowCustomer {
  id: number;
}

export interface iDeleteCustomer {
  id: number;
}

export interface iShowCustomerByPhone {
  phone: string;
}

export interface iUpdatedCustomer {
  id: number;
  name: string;
  phone: string;
}

export interface iCustomer {
  id: number;
  name: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface iCustomerList {
  per_page: number;
  total: number;
  current_page: number;
  data: iCustomer[];
}

export interface iCustomerRepository {
  findAll({ page, skip, take }: SearchParams): Promise<iCustomerList>;
  findByName(name: string): Promise<iCustomer[] | null>;
  findById(id: number): Promise<iCustomer | null>;
  findByPhone(phone: string): Promise<iCustomer | null>;
  create(data: iCreateCustomer): Promise<iCustomer>;
  save(customer: iCustomer): Promise<iCustomer>;
  remove(customer: iCustomer): Promise<void>;
}
