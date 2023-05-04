import { iCustomer } from 'src/@types/Customer/iCustomerService';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer implements iCustomer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ unique: true })
  phone: string;

  //   @OneToMany(() => Enderecos, (endereco) => endereco.cliente)
  //   address: Enderecos[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
