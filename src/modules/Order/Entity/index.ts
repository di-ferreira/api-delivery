import { iAddress } from '@ProjectTypes/Address/iAddressService';
import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iStatusOrder } from '@ProjectTypes/Order/iOrder';
import { Address } from '@modules/Address/Entity';
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
    onDelete: 'SET NULL',
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
  })
  items: iItemOrder[];

  @ManyToOne(() => Address, (address) => address.order, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  deliveryAddress: iAddress;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
