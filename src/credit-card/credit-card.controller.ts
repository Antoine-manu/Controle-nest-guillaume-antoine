import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';

@Controller('accounts/:accountId/cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  async addCard(
    @Param('accountId') accountId: number,
    @Body('userId') userId: number,
    @Body('pinCode') pinCode: string,
  ) {
    return this.creditCardService.addCardToAccount(accountId, userId, pinCode);
  }
}
