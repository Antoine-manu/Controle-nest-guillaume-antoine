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
    
    return this.dabService.whitdraw(accountId, amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('virement')
  async virement(@Req() req, @Body() body) {
    const { accountId, amount, accountIdTo } = body;

    if (!accountId || !amount || amount <= 0) {
      throw new Error('Invalid account ID or amount');
    }
    
    return this.dabService.virement(accountIdTo, accountId, amount);
  }
  

  @Post('cheque-withdraw')
  async chequeWithdraw(@Req() req, @Body() body) {
    const amount = req.amount;
    const accountID = req.accountId;
    return new Promise(resolve => setTimeout(() => this.dabService.chequeWithdraw(amount, accountID), 10000));
  }
}
