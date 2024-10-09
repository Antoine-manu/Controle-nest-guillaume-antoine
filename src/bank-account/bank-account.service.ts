import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { BankAccount, AccountType } from './bank-account.entity';
import { User } from '../user/user.entity';
import { UpdateBankAccountDto } from 'src/dto/update-bank-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(User)
    private transactionRepository: Repository<Transaction>,
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
        relations: ['users', 'cards'], 
      });
  
      if (!account) {
        throw new Error(`Compte bancaire avec l'id ${accountId} introuvable`);
      }
  
      await this.bankAccountRepository.remove(account);
  }
  
  async findAccountById(accountId: number): Promise<BankAccount> {
    const account = await this.bankAccountRepository.findOne({
      where: { id: accountId },
      relations: ['users', 'creditCards'],
    });

    if (!account) {
      throw new Error(`Compte bancaire avec l'ID ${accountId} non trouvé`);
    }

    return account;
  }

  async updateAccount(accountId: number, updateBankAccountDto: UpdateBankAccountDto): Promise<BankAccount> {
    const account = await this.findAccountById(accountId);
    Object.assign(account, updateBankAccountDto);
    return this.bankAccountRepository.save(account);
  }

  async getTotalWithdrawalsForToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const result = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.destinationAccount IS NULL') 
      .andWhere('transaction.date >= :today', { today }) 
      .andWhere('transaction.date < :tomorrow', { tomorrow })
      .getRawOne();

    return result.total ? parseFloat(result.total) : 0;
  }
  
}
