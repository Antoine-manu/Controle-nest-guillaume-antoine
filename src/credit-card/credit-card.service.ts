import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from './credit-card.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async addCardToAccount(accountId: number, userId: number, pinCode: string): Promise<CreditCard> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id: accountId },
      relations: ['users', 'creditCards'],
    });

    if (!bankAccount) {
      throw new BadRequestException('Compte bancaire non trouvé.');
    }

    if (bankAccount.type === 'Livret A') {
      throw new BadRequestException('Les livrets A ne peuvent pas être associés à une carte bleue.');
    }

    if (bankAccount.type === 'Commun') {
      if (bankAccount.creditCards.length >= 2) {
        throw new BadRequestException('Le compte commun a déjà deux cartes bleues.');
      }

      const isUserHolder = bankAccount.users.some((user) => user.id === userId);
      if (!isUserHolder) {
        throw new BadRequestException("L'utilisateur n'est pas titulaire de ce compte commun.");
      }
    }

    const creditCard = this.creditCardRepository.create({
      cardNumber: this.generateCardNumber(),
      pinCode: pinCode,
      bankAccount: bankAccount,
      holder: await this.findUserById(userId),
    });

    return this.creditCardRepository.save(creditCard);
  }

  private generateCardNumber(): string {
    return Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0');
  }

  private async findUserById(userId: number): Promise<User> {
    const user = await this.bankAccountRepository.manager.getRepository(User).findOneBy({id: userId});
    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé.');
    }
    return user;
  }

  async findOne(id: number): Promise<CreditCard> {
    return this.creditCardRepository.findOne({
      where: { id },
      relations: ['holder', 'bankAccount'],
    });
  }
}
