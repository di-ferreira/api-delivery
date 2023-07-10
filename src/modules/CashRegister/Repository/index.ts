import {
  iCashRegister,
  iCashRegisterList,
  iCashRegisterRepository,
  iCreateCashRegister,
} from '@ProjectTypes/CashRegister/iCashRegisterService';
import { SearchParams } from '@ProjectTypes/index';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CashRegister } from '../Entity';

export default class CashRegisterRepository implements iCashRegisterRepository {
  private CustomRepository: Repository<iCashRegister>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(CashRegister);
  }

  public async findOpened(): Promise<iCashRegister> {
    let cashRegister = await this.CustomRepository.findOne({
      where: { open: true },
    });

    return cashRegister;
  }

  public async findAll({
    page,
    limit,
  }: SearchParams): Promise<iCashRegisterList> {
    const [cashRegisters, count] =
      await this.CustomRepository.createQueryBuilder()
        .skip(limit * (page - 1))
        .take(limit)
        .getManyAndCount();

    const result: iCashRegisterList = {
      current_page: page,
      data: cashRegisters,
      per_page: limit,
      total: count,
    };

    return result;
  }

  public async findById(id: number): Promise<iCashRegister> {
    let cashRegister = await this.CustomRepository.findOne({
      where: { id },
    });

    return cashRegister;
  }

  public async closeCashRegister(): Promise<iCashRegister> {
    let cashRegister = await this.CustomRepository.findOne({
      where: { open: true },
    });

    cashRegister = { ...cashRegister, open: false };

    await this.CustomRepository.save(cashRegister);

    return cashRegister;
  }

  public async findBetweenDates(
    InitialDate: Date,
    FinalDate: Date
  ): Promise<iCashRegister[]> {
    const cashRegisters = await this.CustomRepository.createQueryBuilder(
      'cashRegister'
    )
      .where('cashRegister.openDate > :InitialDate', { InitialDate })
      .andWhere('cashRegister.openDate < :FinalDate', { FinalDate })
      .getMany();

    return cashRegisters;
  }

  public async create({ open }: iCreateCashRegister): Promise<iCashRegister> {
    const cashRegister = this.CustomRepository.create({
      open,
    });

    await this.CustomRepository.save(cashRegister);
    return cashRegister;
  }

  public async save(CashRegister: iCashRegister): Promise<iCashRegister> {
    return await this.CustomRepository.save(CashRegister);
  }

  public async remove(CashRegister: iCashRegister): Promise<void> {
    await this.CustomRepository.remove(CashRegister);
  }
}
