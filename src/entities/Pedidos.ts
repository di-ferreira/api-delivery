import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './Cliente';
import { PedidoCardapio } from './PedidoCardapio';

export enum PedidoStatus {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}
@Entity()
export class Pedidos {
  // ID INT PRIMARY KEY,
  // ID_funcionario INT NOT NULL,
  // PrecoTotal DECIMAL(10,2) NOT NULL,
  // Data DATE NOT NULL,
  // Hora TIME NOT NULL
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'numero_pedido' })
  numeroPedido: string;

  @ManyToOne((type) => Customer, (cliente) => cliente.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Customer;

  @OneToOne(
    (type) => PedidoCardapio,
    (pedidoCardapio) => pedidoCardapio.pedido,
    {
      nullable: false,
    }
  )
  pedidoCardapio: PedidoCardapio;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @Column({
    type: 'text',
    enum: PedidoStatus,
    default: PedidoStatus.FILA,
  })
  status: PedidoStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
