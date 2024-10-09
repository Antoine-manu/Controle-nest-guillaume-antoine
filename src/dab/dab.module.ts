import { Module } from '@nestjs/common';
import { DabController } from './dab.controller';
import { DabService } from './dab.service';
import { BankAccountModule } from '../bank-account/bank-account.module'; // Importer le module des comptes bancaires

@Module({
  imports: [BankAccountModule], // On importe le module des comptes
  controllers: [DabController],
  providers: [DabService],
  exports: [DabService],
})
export class DabModule {}
