import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Pet } from './pet.entity';

@Entity('images')
export class Image {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pets_id: number;

  @Column()
  name: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Pet, (pet) => pet.images)
  @JoinColumn({ name: 'pets_id' })
  pet: Pet;
}
