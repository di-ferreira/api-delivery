import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity() //se o nome da tabela for diferente colocar dentro do parenteses
class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}

export default Client;
