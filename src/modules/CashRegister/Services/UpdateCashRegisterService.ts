import {
  iCashRegister,
  iCashRegisterRepository,
  iUpdatedCashRegister,
} from '@ProjectTypes/CashRegister/iCashRegisterService';
import { iOrderRepository } from '@ProjectTypes/Order/iOrder';
import OrderRepository from '@modules/Order/Repository';
import AppError from '@shared/errors/AppError';
import CashRegisterRepository from '../Repository';

export default class UpdateCashRegisterService {
  private cashRegisterRepository: iCashRegisterRepository;
  private orderRepository: iOrderRepository;

  constructor() {
    this.cashRegisterRepository = new CashRegisterRepository();
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    id,
    open,
  }: iUpdatedCashRegister): Promise<iCashRegister> {
    const cashRegister = await this.cashRegisterRepository.findById(id);

    if (!cashRegister) {
      throw new AppError('Cash Register not found');
    }

    let total: number =
      await this.orderRepository.findOrdersTotalByCashRegister(cashRegister);

    cashRegister.open = open;
    cashRegister.total = total;

    await this.cashRegisterRepository.save(cashRegister);

    return cashRegister;
  }
}
