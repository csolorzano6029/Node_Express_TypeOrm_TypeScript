import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee', schema: 'vaccination_registry' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'home_address' })
  homeAddress: string;
}
