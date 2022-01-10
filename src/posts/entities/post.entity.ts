import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Commune } from './commune.entity';
import { Region } from './region.entity';
import { User } from '../../users/entities/user.entity';
import { Pet } from '../../pets/entities/pet.entity';
import { Type } from '@nestjs/common';
import { Post_Type } from './type.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  users_id: number;

  @Column({ type: 'int' })
  pets_id: number;

  @Column({ type: 'int' })
  post_types_id: number;

  @Column({ type: 'int' })
  communes_id: number;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column({ type: 'varchar', length: 225 })
  description: string;

  @Column({ type: 'varchar', length: 45 })
  address: string;

  @Column({ type: 'varchar', length: 45 })
  latitude: string;

  @Column({ type: 'varchar', length: 45 })
  longitude: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'users_id' })
  user: User;

  @OneToOne(() => Pet, (pet) => pet.post, { cascade: true })
  @JoinColumn({ name: 'pets_id' })
  pet: Pet;

  @ManyToOne(() => Post_Type, (post_type) => post_type.posts)
  @JoinColumn({ name: 'post_types_id' })
  post_type: Type;

  @ManyToOne(() => Commune, (commune) => commune.posts)
  @JoinColumn({ name: 'communes_id' })
  commune: Commune;
}
