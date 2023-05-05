import { Address } from '@modules/Address/Entity';
import { iCustomer } from 'src/@types/Customer/iCustomerService';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customer')
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
