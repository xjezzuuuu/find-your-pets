import { Image } from './image.entity';
import { Exclude } from 'class-transformer';
import { Post } from '../../posts/entities/post.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  race: string;

  @Column('int')
  age: number;

  @Column()
  sex: string;

  @Column('varchar')
  size: string;

  @Column('varchar')
  story: string;

  @Column('varchar')
  character: string;

  @Column('varchar')
  social: string;

  @Column('varchar')
  energy: string;

  @Column('varchar')
  friendship: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Image, (image) => image.pet, { cascade: true })
  images: Image[];

  @OneToOne(() => Post, (post) => post.pet)
  post: Post;
}
