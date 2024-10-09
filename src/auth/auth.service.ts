import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreditCardService } from '../credit-card/credit-card.service'; // Service des cartes bancaires
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly creditCardService: CreditCardService, // Utiliser le service des cartes bancaires
  ) {}

  async validateCreditCard(cardId: number, pinCode: string): Promise<any> {
    const card = await this.creditCardService.findOne(cardId);

    if (pinCode !== card.pinCode) {
      throw new UnauthorizedException('Invalid card or PIN');
    }

    return card;
  }

  async login(cardId: number) {
    console.log(cardId)
    const card = await this.creditCardService.findOne(cardId);
    console.log(card)
    const user = card.holder; // Associe le user à la carte

    const payload = { userId: user.id, cardId: card.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
