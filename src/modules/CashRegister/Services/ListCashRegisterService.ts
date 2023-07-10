import { SearchParams } from '@ProjectTypes/index';
import {
  iCashRegisterList,
  iCashRegisterRepository,
} from '../../../ProjectTypes/CashRegister/iCashRegisterService';
import OrderRepository from '../Repository';

export default class ListCashRegisterService {
  private cashRegisterRepository: iCashRegisterRepository;

  constructor() {
    this.cashRegisterRepository = new OrderRepository();
  }

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<iCashRegisterList> {
    let cashRegisterList: iCashRegisterList = {
      current_page: page ? page : 1,
      data: [],
      per_page: limit ? limit : 15,
      total: 0,
    };

    const newCashRegisters = await this.cashRegisterRepository.findAll({
      page: cashRegisterList.current_page,
      limit: cashRegisterList.per_page,
    });
    cashRegisterList = { ...newCashRegisters };

    return cashRegisterList;
  }
}
