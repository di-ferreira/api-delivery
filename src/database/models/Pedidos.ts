import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Cliente from "./Cliente";
import { PedidoCardapio } from "./PedidoCardapio";

export enum PedidoStatus {
  FILA = "na fila",
  PRONTO = "pronto",
  TRANSITO = "em transito",
  ENTREGUE = "entregue",
  CANCELADO = "cancelado",
}
@Entity()
export class Pedidos {
  // ID INT PRIMARY KEY,
  // ID_funcionario INT NOT NULL,
  // PrecoTotal DECIMAL(10,2) NOT NULL,
  // Data DATE NOT NULL,
  // Hora TIME NOT NULL
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "numero_pedido" })
  numeroPedido: string;

  @ManyToOne((type) => Cliente, (cliente) => cliente.pedidos, {
    eager: true,
    nullable: false,
  })
  cliente: Cliente;

  @OneToOne(
    (type) => PedidoCardapio,
    (pedidoCardapio) => pedidoCardapio.pedido,
    {
      eager: true,
      nullable: false,
    }
  )
  pedidoCardapio: PedidoCardapio;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column({ type: "mediumtext", nullable: true })
  observacao: string;

  @Column({
    type: "enum",
    enum: PedidoStatus,
    default: PedidoStatus.FILA,
  })
  status: PedidoStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
