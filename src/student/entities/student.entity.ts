import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sex: boolean;

  @Column({ default: '' })
  phoneNumber: string;
}
