import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-atm')
  async loginATM(@Body() loginDto: { cardId: number, pinCode: string }) {
    const { cardId, pinCode } = loginDto;

    await this.authService.validateCreditCard(cardId, pinCode);

    return this.authService.login(cardId);
  }
}
