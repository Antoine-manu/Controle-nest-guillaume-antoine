import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BankAccount } from '../bank-account/bank-account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => BankAccount, (bankAccount) => bankAccount.users)
  bankAccounts: BankAccount[];
}
