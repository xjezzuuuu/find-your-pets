import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Commune } from './commune.entity';
import { Region } from './region.entity';

@Entity('provinces')
export class Province {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'int' })
  regions_id: number;

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

  @OneToMany(() => Commune, (commune) => commune.province)
  communes: Commune[];

  @ManyToOne(() => Region, (region) => region.provinces)
  @JoinColumn({ name: 'regions_id' })
  region: Region;
}
