import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Addresses from "./Addresses";
import Client from "./Client";
import { ProductListOrder } from "./ProductListOrder";

export enum OrderStatus {
  FILA = "na fila",
  PRONTO = "pronto",
  TRANSITO = "em transito",
  ENTREGUE = "entregue",
  CANCELADO = "cancelado",
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  code: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column({ type: "mediumtext", nullable: true })
  note: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.FILA,
  })
  status: OrderStatus;

  @OneToOne((type) => Addresses, (address) => address.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "addressId" })
  deliveryAddress: Addresses;

  @ManyToOne((type) => Client, (client) => client.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "clientId" })
  client: Client;

  @OneToMany((type) => ProductListOrder, (productsList) => productsList.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "product_list" })
  productsList: ProductListOrder[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
