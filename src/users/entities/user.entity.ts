import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Role } from './role.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  roles_id: number;

  @Column('varchar', { length: 45 })
  first_name: string;

  @Column('varchar', { length: 45 })
  last_name: string;

  @Column('varchar', { length: 45, nullable: true })
  phone?: string;

  @Column('varchar', { length: 45, unique: true })
  email: string;

  @Column('varchar', { length: 45 })
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roles_id' })
  role: Role;
}
