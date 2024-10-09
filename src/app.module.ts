import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { DabService } from './dab/dab.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { DabModule } from './dab/dab.module';
import { AuthController } from './auth/auth.controller';
import { DabController } from './dab/dab.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: '5iw-nest',
      password: 'root',
      database: '5iw-controle',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    BankAccountModule,
    CreditCardModule,
    AuthModule,
    DabModule,
  ],
})
export class AppModule {}
