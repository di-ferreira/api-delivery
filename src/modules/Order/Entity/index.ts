import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iStatusOrder } from '@ProjectTypes/Order/iOrder';
import { Customer } from '@modules/Customer/Entity';
import { ItemOrder } from '@modules/OrderItem/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order implements iOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Customer, (customer) => customer.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'cliente_id' })
  customer: iCustomer;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  @Column({ type: 'text', nullable: true })
  obs: string;

  @Column({
    type: 'text',
    enum: iStatusOrder,
    default: iStatusOrder.FILA,
  })
  status: iStatusOrder;

  @OneToMany((type) => ItemOrder, (ItemOrder) => ItemOrder.order, {
    eager: true,
    cascade: true,
  })
  items: iItemOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
