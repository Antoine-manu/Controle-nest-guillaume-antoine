import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './credit-card.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { CreditCardService } from './credit-card.service';
import { CreditCardController } from './credit-card.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCard, BankAccount])
  ],
  providers: [CreditCardService],
  controllers: [CreditCardController],
  exports: [CreditCardService],
})
export class CreditCardModule {}
