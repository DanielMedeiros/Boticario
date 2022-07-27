import { Module } from '@nestjs/common';
import { CashbackController } from './cashback.controller';
import { CashbackService } from './cashback.service';

@Module({
  controllers: [CashbackController],
  providers: [CashbackService]
})
export class CashbackModule {}
