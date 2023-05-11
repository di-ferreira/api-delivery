import { Customer } from '@modules/Customer/Entity';
import { OrderMenu } from '@modules/OrderMenu/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}
@Entity('order')
export class Order {
  // ID INT PRIMARY KEY,
  // ID_funcionario INT NOT NULL,
  // PrecoTotal DECIMAL(10,2) NOT NULL,
  // Data DATE NOT NULL,
  // Hora TIME NOT NULL
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne((type) => Customer, (customer) => customer.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'cliente_id' })
  customer: Customer;

  @OneToOne((type) => OrderMenu, (orderMenu) => orderMenu.order, {
    nullable: false,
  })
  orderMenu: OrderMenu;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  obs: string;

  @Column({
    type: 'text',
    enum: OrderStatus,
    default: OrderStatus.FILA,
  })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
