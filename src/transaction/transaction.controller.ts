import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() body: { amount: number; sourceAccountId: number; destinationAccountId?: number },
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(body.amount, body.sourceAccountId, body.destinationAccountId);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
