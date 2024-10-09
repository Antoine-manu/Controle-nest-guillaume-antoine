import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user)
  bankAccounts: BankAccount[];
}
