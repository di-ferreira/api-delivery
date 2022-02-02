import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Cliente {
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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
