import { iCustomer } from '@ProjectTypes/Customer/iCustomerService';
import { Address } from '@modules/Address/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
export class Customer implements iCustomer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ unique: true })
  phone: string;

  @OneToMany(() => Address, (address) => address.customer, { cascade: true })
  address: Address[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
