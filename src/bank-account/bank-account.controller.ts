import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { UserService } from '../user/user.service';
import { BankAccount, AccountType } from './bank-account.entity';

@Controller('users/:userId/accounts')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body('accountNumber') accountNumber: string,
    @Body('type') type: AccountType,
  ): Promise<BankAccount> {
    const user = await this.userService.findOne(+userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }

    return this.bankAccountService.create(user, accountNumber, type);
  }

  @Get()
  async findAllForUser(@Param('userId') userId: string): Promise<BankAccount[]> {
    const user = await this.userService.findOne(+userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }

    return this.bankAccountService.findAllForUser(user);
  }

  @Delete(':accountId')
  async remove(@Param('accountId') accountId: string): Promise<void> {
    await this.bankAccountService.remove(+accountId);
  }
}
