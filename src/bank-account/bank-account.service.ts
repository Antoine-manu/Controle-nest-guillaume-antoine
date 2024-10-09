import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount, AccountType } from './bank-account.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createSharedAccount(
    accountNumber: string,
    userIds: number[],
  ): Promise<BankAccount> {
    const users = await this.userRepository.findByIds(userIds);
    if (users.length !== 2) {
      throw new Error('A shared account must be associated with exactly two users.');
    }

    const newAccount = this.bankAccountRepository.create({
      accountNumber,
      type: AccountType.COMMUN,
      users,
    });

    return this.bankAccountRepository.save(newAccount);
  }

  async create(
    userIds: number[],
    accountNumber: string,
    type: AccountType,
  ): Promise<BankAccount> {
    const users = await this.userRepository.findByIds(userIds);
    if (type === AccountType.COMMUN && users.length !== 2) {
      throw new Error('A shared account must be associated with exactly two users.');
    }
  
    const newAccount = this.bankAccountRepository.create({
      accountNumber,
      type,
      users,
    });
  
    return this.bankAccountRepository.save(newAccount);
  }

  async findAllForUser(userId: number): Promise<BankAccount[]> {
    return this.bankAccountRepository.find({
      where: { users: { id: userId } },
      relations: ['users'],
    });
  }

  async remove(accountId: number): Promise<void> {
    await this.bankAccountRepository.delete(accountId);
  }
  
  
  
}
