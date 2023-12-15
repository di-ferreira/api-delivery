import { iAddress } from '@ProjectTypes/Address/iAddressService';
import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { iOrder } from '@ProjectTypes/Order/iOrder';
import { Customer } from '@modules/Customer/Entity';
import { Order } from '@modules/Order/Entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addressess')
export class Address implements iAddress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  // @Column({ type: 'text', length: 2 })
  @Column({ type: 'text' })
  state: string;

  @Column({ nullable: true })
  complement?: string;

  @ManyToOne(() => Customer, (customer) => customer.address, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: iCustomer;

  @OneToMany(() => Order, (order) => order.deliveryAddress, {
    nullable: true,
  })
  order: iOrder[];
}
