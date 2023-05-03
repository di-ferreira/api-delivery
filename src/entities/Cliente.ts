import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Enderecos } from "./Enderecos";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 100,
  })
  nome: string;

  @Column({ unique: true })
  telefone: string;

  @OneToMany(() => Enderecos, (endereco) => endereco.cliente)
  endereco: Enderecos[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
