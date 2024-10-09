import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBankAccountDto {
  @IsOptional()
  @IsString()
  @Length(16, 16)
  accountNumber?: string;

  @IsOptional()
  @IsString()
  type?: 'Courant' | 'Pro' | 'Livret A' | 'Commun';
}
