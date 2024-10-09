import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { UserService } from '../user/user.service';
import { BankAccount, AccountType } from './bank-account.entity';

@Controller('accounts')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body('userIds') userIds: number[],
    @Body('accountNumber') accountNumber: string,
    @Body('type') type: AccountType,
  ) {
    return this.bankAccountService.create(userIds, accountNumber, type);
  }

@Get(':userId')
async findAllForUser(@Param('userId') userId: number) {
  return this.bankAccountService.findAllForUser(userId);
}

@Delete(':accountId')
async remove(@Param('accountId') accountId: number) {
  await this.bankAccountService.remove(+accountId);
}
}
