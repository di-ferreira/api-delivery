import { iOrder } from '@ProjectTypes/Order/iOrder';
import { SearchParams } from '..';

export interface iCreateCashRegister {
  open: boolean;
}

export interface iShowCashRegister {
  id: number;
}

export interface iDeleteCashRegister {
  id: number;
}

export interface iUpdatedCashRegister {
  id: number;
  open?: boolean;
}

export interface iCashRegister {
  id: number;
  open: boolean;
  total: number;
  openDate: Date;
  orders: iOrder[];
}

export interface iCashRegisterList {
  per_page: number;
  total: number;
  current_page: number;
  data: iCashRegister[];
}

export interface iCashRegisterRepository {
  findAll({ page, limit }: SearchParams): Promise<iCashRegisterList>;
  findById(id: number): Promise<iCashRegister | null>;
  findOpened(): Promise<iCashRegister | null>;
  closeCashRegister(): Promise<iCashRegister>;
  findBetweenDates(
    InitialDate: Date,
    FinalDate: Date
  ): Promise<iCashRegister[] | null>;
  create(data: iCreateCashRegister): Promise<iCashRegister>;
  save(CashRegister: iCashRegister): Promise<iCashRegister>;
  remove(CashRegister: iCashRegister): Promise<void>;
}
