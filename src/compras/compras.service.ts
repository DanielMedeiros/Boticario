import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UseGuards } from '@nestjs/common';
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
    try {
      return await this.comprasRepository.getCompras();  
    } catch (error) {
      this.logger.error(`Não foi possivel listar as compras,  error ${error}`);
      throw new InternalServerErrorException(
        'Não foi possivel listar as compras',
      );
    }

  }

  async getComprasByCpf(cpf: string): Promise<CashBackResultDTO[]> {

    const hasCPF = await this.comprasRepository.hasCPF(cpf);

    if (!hasCPF) {
      throw new NotFoundException(
        `Esse cpf: ${cpf} não possui nenhuma compra cadastrada`,
      );
    }


    try {
      const compras = await this.comprasRepository.getComprasByCpf(cpf);
    
      let comprasCashback = [];

      compras.map((compra) => {
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

    } catch (error) {
      this.logger.error(`Não foi possivel listar as compras para esse cpf: ${cpf},  error ${error}`);
      throw new InternalServerErrorException(
        'Não foi possivel listar as compras por cpf',
      );
    }



  }

  porcentagemCashBack(valor: number) {
    if(valor <= 1000){      
      return 10+"%";
    }

    if(valor >= 1000 && valor <= 1500){      
      return 15+"%";
    }
    
    if(valor > 1500){      
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
    
    if(valor > 1500){
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
      const compras = await this.comprasRepository.createCompras(createComprasDTO);
      this.logger.log('Compra cadastrada com sucesso.');
      return compras;
    } catch (error) {
      this.logger.error(`Falha ao cadastrar uma compra,  error ${error}`);
      throw new InternalServerErrorException(
        'Falha ao cadastrar uma compra',
      );
    }
    
  }
}
