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
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Role } from './role.entity';
import { Post } from '../../posts/entities/post.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
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

  @Exclude()
  @Column('varchar', { length: 100 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roles_id' })
  role: Role;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
