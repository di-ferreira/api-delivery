import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";
import { Products } from "./Products";

@Entity()
export class ProductListOrder {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    type: "int",
  })
  quantity: number;

  @ManyToMany((type) => Products, { cascade: true })
  @JoinTable()
  producs: Products[];

  @ManyToOne((type) => Order, (order) => order.productsList, {
    eager: true,
    nullable: false,
  })
  order: Order;

  @Column({ type: "boolean", default: false })
  combo: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
