import { Menu } from '@modules/Menu/Entity';
import { Order } from '@modules/Order/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_menu' })
export class OrderMenu {
  // ID_Pedido INT NOT NULL,
  // ID_Cardapio INT NOT NULL,
  // PRIMARY KEY(ID_Pedido, ID_Cardapio),
  // Quantidade INT NOT NULL
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    default: 1,
  })
  quantity: number;

  @OneToOne((type) => Order, (order) => order.orderMenu, {
    eager: true,
    nullable: false,
  })
  order: Order;

  @OneToMany((type) => Menu, (menu) => menu.orderMenu)
  menu: Menu[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
