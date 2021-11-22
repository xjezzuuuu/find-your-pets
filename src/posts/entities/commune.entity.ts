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
import { Province } from './province.entity';
import { OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity('communes')
export class Commune {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'varchar' })
  provinces_id: number;

  @Column({ type: 'varchar', length: 45 })
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

  @ManyToOne(() => Province, (province) => province.communes)
  @JoinColumn({ name: 'provinces_id' })
  province: Province;

  @OneToMany(() => Post, (post) => post.commune)
  posts: Post[];
}
