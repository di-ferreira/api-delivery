import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Pedidos } from "./Pedidos";

@Entity()
class Cliente {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 100,
  })
  nome: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ type: "char", length: 2 })
  uf: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ unique: true })
  telefone: string;

  @OneToMany((type) => Pedidos, (pedidos) => pedidos.cliente)
  pedidos: Pedidos[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}

export default Cliente;
