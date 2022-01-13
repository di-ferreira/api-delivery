import { ProductsType } from "./ProductsType";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "mediumtext", nullable: true })
  description: string;

  @ManyToOne((type) => ProductsType, (productType) => productType.products, {
    cascade: ["insert", "remove"],
    eager: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  productType: ProductsType;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
