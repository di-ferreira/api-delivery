import {
  iCashRegister,
  iCashRegisterRepository,
} from '@ProjectTypes/CashRegister/iCashRegisterService';
import AppError from '@shared/errors/AppError';
import CashRegisterRepository from '../Repository';

export default class CreateCashRegisterService {
  private cashRegisterRepository: iCashRegisterRepository;

  constructor() {
    this.cashRegisterRepository = new CashRegisterRepository();
  }

  public async execute(): Promise<iCashRegister> {
    const cashRegisterOpened = await this.cashRegisterRepository.findOpened();

    if (cashRegisterOpened) {
      throw new AppError('There is already Cash Register Open');
    }

    const cashRegister = await this.cashRegisterRepository.create({
      open: true,
    });

    return cashRegister;
  }
}
