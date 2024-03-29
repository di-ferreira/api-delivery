import { iPayment } from '@ProjectTypes/Payment/iPayment';
import { iPaymentMethod } from '@ProjectTypes/PaymentMethod/iPaymentMethod';
import { Payment } from '@modules/Payment/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_method')
export class PaymentMethod implements iPaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Payment)
  payment: iPayment;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
