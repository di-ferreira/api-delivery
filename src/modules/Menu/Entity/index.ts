import { OrderMenu } from '@modules/OrderMenu/Entity';
import { Product } from '@modules/Product/Entity';
import { TypeMenu } from '@modules/TypeMenu/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne((type) => OrderMenu, (orderMenu) => orderMenu.menu, {
    eager: true,
    nullable: false,
  })
  orderMenu: OrderMenu;

  @ManyToOne((type) => TypeMenu, (typeMenu) => typeMenu.menu, {
    eager: true,
    nullable: false,
  })
  typeMenu: TypeMenu;

  @ManyToMany((type) => Product, { cascade: true, eager: true })
  @JoinTable()
  produto: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
