import Client from "./Client";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  city: string;

  @Column()
  complement: string;

  @ManyToOne((type) => Client, (adresses) => Addresses)
  @Column({ name: "client_id" })
  client: Client;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
export default Addresses;
