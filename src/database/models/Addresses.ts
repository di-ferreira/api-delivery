import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Client from "./Client";

@Entity()
class Addresses {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  complement: string;

  @ManyToOne((type) => Client, (client) => client.adresses, {
    cascade: ["insert", "remove"],
    eager: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  client: Client;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
export default Addresses;
