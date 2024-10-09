import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';

export enum AccountType {
  COURANT = 'Courant',
  PRO = 'Pro',
  LIVRET_A = 'Livret A',
  COMMUN = 'Commun',
}

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  accountNumber: string;

  @Column({ type: 'enum', enum: AccountType })
  type: AccountType;

  @ManyToMany(() => User, (user) => user.bankAccounts)
  @JoinTable({
    name: 'user_bank_accounts',
    joinColumn: { name: 'bank_account_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];
}
