import {
  iCashRegister,
  iCashRegisterRepository,
  iDeleteCashRegister,
} from '@ProjectTypes/CashRegister/iCashRegisterService';
import AppError from '@shared/errors/AppError';
import CashRegisterRepository from '../Repository';

class DeleteOrderService {
  private cashRegisterRepository: iCashRegisterRepository;

  constructor() {
    this.cashRegisterRepository = new CashRegisterRepository();
  }

  public async execute({ id }: iDeleteCashRegister): Promise<iCashRegister> {
    const cashRegister = await this.cashRegisterRepository.findById(id);

    if (!cashRegister) {
      throw new AppError('Cash Register not found');
    }

    await this.cashRegisterRepository.remove(cashRegister);

    return cashRegister;
  }
}

export default DeleteOrderService;
