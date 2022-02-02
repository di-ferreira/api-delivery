import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cardapio } from "./Cardapio";
import { Pedidos } from "./Pedidos";

@Entity({ name: "Pedido_Cardapio" })
export class PedidoCardapio {
  // ID_Pedido INT NOT NULL,
  // ID_Cardapio INT NOT NULL,
  // PRIMARY KEY(ID_Pedido, ID_Cardapio),
  // Quantidade INT NOT NULL
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    type: "int",
    default: 1,
  })
  quantidade: number;

  @OneToOne((type) => Pedidos, (pedido) => pedido.pedidoCardapio, {
    eager: true,
    nullable: false,
  })
  pedido: Pedidos;

  @OneToMany((type) => Cardapio, (cardapio) => cardapio.pedidoCardapio)
  cardapio: Cardapio[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
