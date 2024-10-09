import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { BankAccount } from '../bank-account/bank-account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) {}

  async createTransaction(
    amount: number,
    sourceAccountId: number,
    destinationAccountId?: number,
  ): Promise<Transaction> {
    const sourceAccount = await this.bankAccountRepository.findOne({
      where: { id: sourceAccountId },
    });

    if (!sourceAccount) {
      throw new Error('Source account not found');
    }

    sourceAccount.balance -= amount;

    let destinationAccount: BankAccount | undefined;
    if (destinationAccountId) {
      destinationAccount = await this.bankAccountRepository.findOne({
        where: { id: destinationAccountId },
      });

      if (!destinationAccount) {
        throw new Error('Destination account not found');
      }

      destinationAccount.balance += amount;
    }

    await this.bankAccountRepository.save(sourceAccount);
    if (destinationAccount) {
      await this.bankAccountRepository.save(destinationAccount);
    }

    const transaction = this.transactionRepository.create({
      amount,
      sourceAccount,
      destinationAccount,
      date: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: ['sourceAccount', 'destinationAccount'], 
    });
  }

  async findLastTenByAccount(accountId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: [{ sourceAccount: { id: accountId } }, { destinationAccount: { id: accountId } }],
      order: {
        createdAt: 'DESC', 
      },
      relations: ['sourceAccount', 'destinationAccount'],
      take: 10, 
    });
  }
}
