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
  ) {}

  async create(user: User, accountNumber: string, type: AccountType): Promise<BankAccount> {
    const existingAccount = await this.bankAccountRepository.findOne({
      where: { user, type },
    });

    if (existingAccount) {
      throw new Error(`L'utilisateur a déjà un compte de type ${type}.`);
    }

    const account = this.bankAccountRepository.create({
      accountNumber,
      type,
      user,
    });

    return this.bankAccountRepository.save(account);
  }

  findAllForUser(user: User): Promise<BankAccount[]> {
    return this.bankAccountRepository.find({ where: { user } });
  }

  async remove(id: number): Promise<void> {
    await this.bankAccountRepository.delete(id);
  }
}
