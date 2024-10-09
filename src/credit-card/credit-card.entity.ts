import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankAccount } from '../bank-account/bank-account.entity';
import { User } from '../user/user.entity';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string;

  @Column()
  pinCode: string; 

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.creditCards, {
    onDelete: 'CASCADE',
  })
  bankAccount: BankAccount;

  @ManyToOne(() => User, { nullable: true })
  holder: User;
}
