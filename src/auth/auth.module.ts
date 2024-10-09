import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { CreditCardModule } from '../credit-card/credit-card.module'; // Module des cartes bancaires
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Utilise une clé secrète pour signer le JWT
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
    CreditCardModule, // Importer le module qui gère les cartes bancaires
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
