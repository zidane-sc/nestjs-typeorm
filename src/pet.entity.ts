import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PartialType } from '@nestjs/mapped-types';
import { User } from './user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => User, (user) => user.pets)
  owner: User;
}
