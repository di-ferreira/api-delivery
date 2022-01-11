import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Addresses from "./Addresses";
import PhoneNumbers from "./PhoneNumbers";

@Entity() //se o nome da tabela for diferente colocar dentro do parenteses
class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @OneToMany((type) => Addresses, (address) => address.client)
  adresses: Addresses[];

  @OneToMany((type) => PhoneNumbers, (phoneNumber) => phoneNumber.client)
  phoneNumbers: PhoneNumbers[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}

export default Client;
