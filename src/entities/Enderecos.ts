import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Cliente';

@Entity()
export class Enderecos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ type: 'text', length: 2 })
  uf: string;

  @Column({ nullable: true })
  complemento: string;

  @ManyToOne(() => Customer, (cliente) => cliente.address, {
    eager: true,
    nullable: false,
  })
  cliente: Customer;
}
