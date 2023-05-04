import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enderecos } from './Enderecos';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ unique: true })
  phone: string;

  @OneToMany(() => Enderecos, (endereco) => endereco.cliente)
  address: Enderecos[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
