import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compras } from './compras.entity';
import { ComprasRepository } from './compras.repository';
import { CashBackResultDTO } from './dto/cashback-result.dto';
import { CreateComprasDTO } from './dto/create-compras.dto';

@Injectable()
export class ComprasService {
  private readonly logger = new Logger(ComprasService.name);

  constructor(
    @InjectRepository(ComprasRepository)
    private comprasRepository: ComprasRepository,
  ) { }


  async getCompras(): Promise<Compras[]> {
    return await this.comprasRepository.getCompras();
  }

  async getComprasByCpf(cpf: string): Promise<CashBackResultDTO[]> {

    const hasCPF = await this.comprasRepository.hasCPF(cpf);

    if (!hasCPF) {
      throw new NotFoundException(
        `Esse cpf: ${cpf} não possui nenhuma compra cadastrada`,
      );
    }

    const compras = await this.comprasRepository.getComprasByCpf(cpf);
    
    let comprasCashback = [];

    compras.map((compra)=>{
      console.log(compra)
      const compraResult = {
        codigo: compra.codigo,
        valor: compra.valor,
        data: compra.data,
        porcCashback: this.porcentagemCashBack(compra.valor),
        cashbackRecebido: this.calculaCashBack(compra.valor),
        status: compra.status
      }

      comprasCashback.push(compraResult)
    })

    return comprasCashback; 
    
  }

  porcentagemCashBack(valor: number) {
    if(valor <= 1000){
      return 10+"%";
    }

    if(valor >= 1000 || valor <= 1500){
      return 15+"%";
    }
    
    if(valor >= 1500){
      return 20+"%";
    }
    
  }

  calculaCashBack(valor: number) {
    if(valor <= 1000){
      return valor * (10 / 100);
    }

    if(valor >= 1000 || valor <= 1500){
      return valor * (15 / 100);
    }
    
    if(valor >= 1500){
      return valor * ( 20 / 100);
    }
    
  }


  async createCompras(createComprasDTO: CreateComprasDTO): Promise<Compras> {
    const { codigo } = createComprasDTO;

    if (!codigo) {
      throw new BadRequestException(
        'Codigo não informado',
      );
    }

    const hasCodigo = await this.comprasRepository.hasCodigo(codigo);

    if (hasCodigo) {
      throw new BadRequestException(
        `O codigo ${codigo} já foi cadastrado`,
      );
    }

    try {
      return await this.comprasRepository.createCompras(createComprasDTO);
    } catch (error) {
      this.logger.error(`Falha ao cadastrar uma compra,  error ${error}`);
    }
    this.logger.log('Compra cadastrada com sucesso.');
  }
}
