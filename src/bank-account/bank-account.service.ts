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

  async create(
    userIds: number[],
    accountNumber: string,
    type: AccountType,
  ): Promise<BankAccount> {
    const users = await this.userRepository.findByIds(userIds);
    if (type === AccountType.COMMUN && users.length !== 2) {
      throw new Error('Un compte commun doit etre créer pour deux utilisateurs');
    }
  
    if (type !== AccountType.COMMUN && users.length !== 1) {
        throw new Error('Un seul utilisateur peut etre associé a ce type de compte');
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
    const account = await this.bankAccountRepository.findOne({
        where: { id: accountId },
        relations: ['users'], 
      });
  
      if (!account) {
        throw new Error(`Compte bancaire avec l'id ${accountId} introuvable`);
      }
  
      await this.bankAccountRepository.remove(account);
  }
  
  
  
}
