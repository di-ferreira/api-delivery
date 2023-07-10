import {
  iCashRegister,
  iCashRegisterRepository,
  iShowCashRegister,
} from '@ProjectTypes/CashRegister/iCashRegisterService';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

export default class ShowCashRegisterService {
  private cashRegisterRepository: iCashRegisterRepository;

  constructor() {
    this.cashRegisterRepository = new OrderRepository();
  }

  public async execute({ id }: iShowCashRegister): Promise<iCashRegister> {
    const cashRegister = await this.cashRegisterRepository.findById(Number(id));

    if (!cashRegister) {
      throw new AppError('Cash Register not found');
    }

    return cashRegister;
  }
}
