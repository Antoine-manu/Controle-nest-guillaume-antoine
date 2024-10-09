import { Module } from '@nestjs/common';
import { DabController } from './dab.controller';
import { DabService } from './dab.service';
import { BankAccountModule } from '../bank-account/bank-account.module'; // Importer le module des comptes bancaires
import { CreditCardModule } from 'src/credit-card/credit-card.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [BankAccountModule, TransactionModule, CreditCardModule],
  controllers: [DabController],
  providers: [DabService],
  exports: [DabService],
})
export class DabModule {}
