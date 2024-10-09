import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DabService } from './dab.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dabs')
export class DabController {
  constructor(private readonly dabService: DabService) {}

  // Route GET protégée pour consulter les soldes des comptes
  @UseGuards(JwtAuthGuard) // Assurez-vous que l'utilisateur est authentifié
  @Get('account-balances')
  async getAccountBalances(@Req() req) {
    const userId = req.user.userId; // Récupérer l'ID utilisateur à partir du token JWT
    return this.dabService.getAccountBalances(userId);
  }
}
