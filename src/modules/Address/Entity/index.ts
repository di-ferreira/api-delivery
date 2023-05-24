import { iAddress } from '@ProjectTypes/Address/iAddressService';
import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { Customer } from '@modules/Customer/Entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ type: 'text', length: 2 })
  state: string;

  @Column({ nullable: true })
  complement?: string;

  @ManyToOne(() => Customer, (customer) => customer.address, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: iCustomer;
}
