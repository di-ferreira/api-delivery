import { iProduct } from '@ProjectTypes/Product/iProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product implements iProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  costPrice: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true, name: 'minimum_stock' })
  minStock: number;

  @Column({ type: 'int', nullable: true, name: 'stock' })
  stock: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
