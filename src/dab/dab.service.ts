import { Injectable } from '@nestjs/common';
import { BankAccountService } from '../bank-account/bank-account.service'; // Service des comptes bancaires

@Injectable()
export class DabService {
  constructor(private readonly bankAccountService: BankAccountService) {}

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
}
