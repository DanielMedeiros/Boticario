import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Compras } from './compras.entity';
import { ComprasService } from './compras.service';
import { CashBackResultDTO } from './dto/cashback-result.dto';
import { CreateComprasDTO } from './dto/create-compras.dto';

@Controller('compras')
export class ComprasController {
  constructor(
    private comprasService: ComprasService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCompras(): Promise<Compras[]> {
    return this.comprasService.getCompras();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cpf')
  getComprasByCpf(@Param('cpf') cpf: string): Promise<CashBackResultDTO[]> {    
    return this.comprasService.getComprasByCpf(cpf);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createRevendedor(@Body() createComprasDTO: CreateComprasDTO): Promise<Compras> {
    return this.comprasService.createCompras(createComprasDTO);
  }
}
