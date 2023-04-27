import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from './Produto';
import { PedidoCardapio } from './PedidoCardapio';
import { TipoCardapio } from './TipoCardapio';

@Entity()
export class Cardapio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @ManyToOne(
    (type) => PedidoCardapio,
    (pedidoCardapio) => pedidoCardapio.cardapio,
    {
      eager: true,
      nullable: false,
    }
  )
  pedidoCardapio: PedidoCardapio;

  @ManyToOne((type) => TipoCardapio, (tipoCardapio) => tipoCardapio.cardapio, {
    eager: true,
    nullable: false,
  })
  tipoCardapio: TipoCardapio;

  @ManyToMany((type) => Produto, { cascade: true, eager: true })
  @JoinTable()
  produto: Produto[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
