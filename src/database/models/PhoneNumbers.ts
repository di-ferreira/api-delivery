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
class PhoneNumbers {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @ManyToOne((type) => Client, (client) => client.phoneNumbers, {
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

export default PhoneNumbers;
