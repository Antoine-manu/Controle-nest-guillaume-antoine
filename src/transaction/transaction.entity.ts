import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BankAccount } from '../bank-account/bank-account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; 

  @ManyToOne(() => BankAccount, { nullable: true })
  sourceAccount: BankAccount; 

  @ManyToOne(() => BankAccount, { nullable: true })
  destinationAccount: BankAccount; 

  @Column()
  date: Date; 

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
