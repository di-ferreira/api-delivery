import { iTypeMenu } from '@ProjectTypes/TypeMenu/iTypeMenu';
import { Menu } from '@modules/Menu/Entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('types_menu')
export class TypeMenu implements iTypeMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany((type) => Menu, (menu) => menu.type)
  menu: Menu[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
