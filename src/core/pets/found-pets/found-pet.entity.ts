import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'found_pets' })
export class FoundPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  species: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  breed: string | null;

  @Column({ type: 'varchar', length: 60 })
  color: string;

  @Column({ type: 'varchar', length: 20 })
  size: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  photoUrl: string | null;

  @Column({ type: 'varchar', length: 120 })
  finderName: string;

  @Column({ type: 'varchar', length: 200 })
  finderEmail: string;

  @Column({ type: 'varchar', length: 40 })
  finderPhone: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: { type: 'Point'; coordinates: [number, number] };

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'timestamptz' })
  foundDate: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

