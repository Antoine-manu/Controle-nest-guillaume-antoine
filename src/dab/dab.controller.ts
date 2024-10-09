import { Controller, Get, UseGuards, Req, Param, Post, Body } from '@nestjs/common';
import { DabService } from './dab.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dabs')
export class DabController {
  constructor(private readonly dabService: DabService) {}

  @UseGuards(JwtAuthGuard)
  @Get('account-balances')
  async getAccountBalances(@Req() req) {
    const userId = req.user.userId; 
    return this.dabService.getAccountBalances(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-10-last/:cardId')
  async getTenLastOperations(@Req() req, @Param('cardId') cardId: string) {
    return this.dabService.getTenLastOperations(cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  async withdraw(@Req() req, @Body() body) {
    const userId = req.user.userId;
    const { accountId, amount } = body;

    if (!accountId || !amount || amount <= 0) {
      throw new Error('Invalid account ID or amount');
    }

    return this.dabService.whitdraw(userId, accountId, amount);
  }
}
