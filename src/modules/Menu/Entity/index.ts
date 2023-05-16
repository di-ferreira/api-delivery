import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import { iMenu } from '@ProjectTypes/Menu/iMenu';
import { iProduct } from '@ProjectTypes/Product/iProduct';
import { iTypeMenu } from '@ProjectTypes/TypeMenu/iTypeMenu';
import { ItemOrder } from '@modules/OrderItem/Entity';
import { Product } from '@modules/Product/Entity';
import { TypeMenu } from '@modules/TypeMenu/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menus')
export class Menu implements iMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany((type) => ItemOrder, (orderMenu) => orderMenu.menu, {
    nullable: false,
  })
  @JoinColumn({ name: 'item_order_id' })
  itemOrder: iItemOrder[];

  @ManyToOne((type) => TypeMenu, (typeMenu) => typeMenu.menu, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'type_menu_id' })
  type: iTypeMenu;

  @ManyToMany((type) => Product, { cascade: true, eager: true })
  @JoinTable({
    name: 'menu_products',
    joinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: iProduct[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
