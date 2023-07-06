import { iCashRegister } from '@ProjectTypes/CashRegister/iCashRegisterService';
import { iOrder } from '@ProjectTypes/Order/iOrder';
import { Order } from '@modules/Order/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cash_registers')
export class CashRegister implements iCashRegister {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false })
  open: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  @OneToMany((type) => Order, (Order) => Order.cashRegister, {})
  orders: iOrder[];

  @CreateDateColumn({ name: 'open_date' })
  openDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
