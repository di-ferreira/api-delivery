import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column({
    name: "preco_custo",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  precoCusto: number;

  @Column({ type: "mediumtext", nullable: true })
  descricao: string;

  @Column({ type: "int", nullable: true, name: "estoque_minimo" })
  estoqueMin: number;

  @Column({ type: "int", nullable: true, name: "estoque_maximo" })
  estoqueMax: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}
