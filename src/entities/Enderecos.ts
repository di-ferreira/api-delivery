import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './Cliente';

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

  @ManyToOne(() => Cliente, (cliente) => cliente.endereco, {
    eager: true,
    nullable: false,
  })
  cliente: Cliente;
}
