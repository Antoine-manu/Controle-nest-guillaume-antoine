import { Injectable } from '@nestjs/common';
import { BankAccountService } from '../bank-account/bank-account.service';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from 'typeorm';
import { CreditCardService } from 'src/credit-card/credit-card.service';

@Injectable()
export class DabService {
  constructor(
    private readonly bankAccountService: BankAccountService, 
    private readonly transactionService: TransactionService, 
    private readonly creditCardService: CreditCardService
  ) {}

  async getAccountBalances(userId: number): Promise<any> {
    const accounts = await this.getAccounts(userId);
    const accountsReturn = []
    accounts.map(account => {
      accountsReturn.push({account : account.type, solde: account.balance})
    })
    return accountsReturn
  }

  async withdraw(accountId: number, amount: number): Promise<any> {
    const account = await this.bankAccountService.findAccountById(accountId)
    const totalToday = await this.bankAccountService.getTotalWithdrawalsForToday()
    if(totalToday + amount < account.plafond){
      return await this.transactionService.createTransaction(amount,accountId)
    }
    else {
      throw new Error('Plafond dépassé');
    }
  }

  async virement(accountIdTo: number, accountId: number, amount: number): Promise<any> {
    return await this.transactionService.createTransaction(amount,accountId, accountIdTo)
  }

  async getAccounts(userId: number): Promise<any> {
    return this.bankAccountService.findAllForUser(userId);
  }

  async chequeWithdraw(amount: number, accountID: number): Promise<any> {
    return this.transactionService.createWithdraw(amount, accountID)
  }

  async getTenLastOperations(cardId): Promise<Transaction[]>{
    console.log(cardId)
    const card = await this.creditCardService.findOne(cardId)
    console.log(card)
    const transactions: any = this.transactionService.findLastTenByAccount(card.bankAccount.id);
    return transactions
  }
}
