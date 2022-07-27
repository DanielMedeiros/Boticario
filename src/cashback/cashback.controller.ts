import { Controller, Get } from '@nestjs/common';
import { CashbackService } from './cashback.service';
import { CashBackAcumuladoDTO } from './dto/cashback-acumulado.dto';

@Controller('cashback')
export class CashbackController {

    constructor(
        private cashBackService: CashbackService,
      ) { }

    @Get()
    getCashBackAcumulado(): Promise<CashBackAcumuladoDTO> {
      return  this.cashBackService.getCashBackAcumulado();
    }
}
