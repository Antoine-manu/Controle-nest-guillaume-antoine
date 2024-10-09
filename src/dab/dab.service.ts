import { Injectable } from '@nestjs/common';
import { BankAccountService } from '../bank-account/bank-account.service'; // Service des comptes bancaires
import { TransactionService } from '../transaction/transaction.service'; // Service des comptes bancaires
import { Transaction } from 'typeorm';
import { CreditCardService } from 'src/credit-card/credit-card.service';

@Injectable()
export class DabService {
  constructor(private readonly bankAccountService: BankAccountService, private readonly transactionService: TransactionService, private readonly creditCardService: CreditCardService) {}

  // Méthode pour récupérer les soldes des comptes de l'utilisateur
  async getAccountBalances(userId: number): Promise<any> {
    const accounts = await this.getAccounts(userId);
    const accountsReturn = []
    accounts.map(account => {
      accountsReturn.push({account : account.type, solde: account.balance})
    })
    return accountsReturn
  }

  async getAccounts(userId: number): Promise<any> {
    return this.bankAccountService.findAllForUser(userId); // On récupère les comptes et leurs soldes
  }

  async getTenLastOperations(cardId): Promise<Transaction[]>{
    console.log(cardId)
    const card = await this.creditCardService.findOne(cardId)
    console.log(card)
    const transactions: any = this.transactionService.findLastTenByAccount(card.bankAccount.id);
    return transactions
  }
}
