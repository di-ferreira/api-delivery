import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
