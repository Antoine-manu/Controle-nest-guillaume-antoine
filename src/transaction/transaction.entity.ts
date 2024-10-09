import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BankAccount } from '../bank-account/bank-account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; // Montant de la transaction

  @ManyToOne(() => BankAccount, { nullable: false })
  sourceAccount: BankAccount; // Compte de départ

  @ManyToOne(() => BankAccount, { nullable: true })
  destinationAccount: BankAccount; // Compte d'arrivée (facultatif)

  @Column()
  date: Date; // Date de la transaction

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Date de création
}
