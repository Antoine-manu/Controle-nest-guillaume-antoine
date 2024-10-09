import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/user.entity';

export enum AccountType {
  COURANT = 'Courant',
  PRO = 'Pro',
  LIVRET_A = 'Livret A',
  COMMUN = 'Commun',
}

@Entity()
@Unique(['user', 'type'])
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  accountNumber: string;

  @Column({ type: 'enum', enum: AccountType })
  type: AccountType;

  @ManyToOne(() => User, (user) => user.bankAccounts, { onDelete: 'CASCADE' })
  user: User;
}
