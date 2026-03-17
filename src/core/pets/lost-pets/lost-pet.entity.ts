import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'lost_pets' })
export class LostPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  species: string;

  @Column({ type: 'varchar', length: 120 })
  breed: string;

  @Column({ type: 'varchar', length: 60 })
  color: string;

  @Column({ type: 'varchar', length: 20 })
  size: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  photoUrl: string | null;

  @Column({ type: 'varchar', length: 120 })
  ownerName: string;

  @Column({ type: 'varchar', length: 200 })
  ownerEmail: string;

  @Column({ type: 'varchar', length: 40 })
  ownerPhone: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: { type: 'Point'; coordinates: [number, number] };

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'timestamptz' })
  lostDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

