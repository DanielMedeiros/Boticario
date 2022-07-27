import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Compras } from './compras.entity';
import { ComprasService } from './compras.service';
import { CashBackResultDTO } from './dto/cashback-result.dto';
import { CreateComprasDTO } from './dto/create-compras.dto';

@Controller('compras')
export class ComprasController {
  constructor(
    private comprasService: ComprasService,
  ) { }


  @Get()
  getCompras(): Promise<Compras[]> {
    return this.comprasService.getCompras();
  }

  @Get(':cpf')
  getComprasByCpf(@Param('cpf') cpf: string): Promise<CashBackResultDTO[]> {    
    return this.comprasService.getComprasByCpf(cpf);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRevendedor(@Body() createComprasDTO: CreateComprasDTO): Promise<Compras> {
    return this.comprasService.createCompras(createComprasDTO);
  }
}
