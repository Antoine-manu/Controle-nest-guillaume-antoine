import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BankAccountModule } from './bank-account/bank-account.module';

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
  ],
})
export class AppModule {}
