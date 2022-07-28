import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CashbackService } from './cashback.service';
import { CashBackAcumuladoDTO } from './dto/cashback-acumulado.dto';

@Controller('cashback')
export class CashbackController {

    constructor(
        private cashBackService: CashbackService,
      ) { }

    @UseGuards(JwtAuthGuard)  
    @Get()
    getCashBackAcumulado(): Promise<CashBackAcumuladoDTO> {
      return  this.cashBackService.getCashBackAcumulado();
    }
}
