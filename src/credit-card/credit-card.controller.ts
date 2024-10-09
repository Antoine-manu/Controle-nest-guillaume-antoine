import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';

@Controller('accounts/:accountId/cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  // Route POST pour ajouter une carte à un compte
  @Post()
  async addCard(
    @Param('accountId') accountId: number,
    @Body('userId') userId: number, // Identifiant de l'utilisateur demandant la carte
    @Body('pinCode') pinCode: string, // Code PIN de 4 chiffres
  ) {
    return this.creditCardService.addCardToAccount(accountId, userId, pinCode);
  }
}
