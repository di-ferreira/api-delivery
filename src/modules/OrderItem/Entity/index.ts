import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iMenu } from '@ProjectTypes/Menu/iMenu';
import { iOrder } from '@ProjectTypes/Order/iOrder';
import { Menu } from '@modules/Menu/Entity';
import { Order } from '@modules/Order/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_items' })
export class ItemOrder implements iItemOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    default: 1,
  })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  @ManyToOne((type) => Order, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: iOrder;

  @ManyToOne((type) => Menu, (menu) => menu.itemOrder, {
    eager: true,
    nullable: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'menu_id' })
  menu: iMenu;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
