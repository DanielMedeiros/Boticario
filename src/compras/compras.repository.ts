import { EntityRepository, Repository } from 'typeorm';
import { CreateComprasDTO } from './dto/create-compras.dto';
import { Compras } from './compras.entity';
import { EstatusCompras } from './status-compras.enum';
import { CodigoDTO } from './dto/codigo.dto';
import { Codigo } from './codigo.entity';
import { CPF } from './cpf.entity';

@EntityRepository(Compras)
export class ComprasRepository extends Repository<Compras> {

  async getCompras(): Promise<Compras[]> {
    const query = this.createQueryBuilder('compras');

    const compras = await query.getMany();

    return compras;
  }

  async getComprasByCpf(cpf: string): Promise<Compras[]> {    

    const query = this.createQueryBuilder('compras');
    if (cpf) {
      query.andWhere('compras.cpf = :cpf', { cpf });    }
     
    const compras = await query.getMany();

    return compras;
  }

  async hasCodigo(
    codigo:string,
  ): Promise<Codigo> {
    const query = this.createQueryBuilder('compras');
    if (codigo) {
      query.andWhere('compras.codigo = :codigo', { codigo });
    }

    const hasCodigo = await query.getRawOne();

    return hasCodigo;
  }

  async hasCPF(
    cpf:string,
  ): Promise<CPF> {
    const query = this.createQueryBuilder('compras');
    if (cpf) {
      query.andWhere('compras.cpf = :cpf', { cpf });
    }

    const hasCPF = await query.getRawOne();

    return hasCPF;
  }

  async createCompras(createComprasDTO: CreateComprasDTO): Promise<Compras> {
    
    const { codigo, valor, data, cpf } =
    createComprasDTO;
   
    const compra = this.create({
      codigo,
      valor,
      data,
      cpf,
      status: cpf === '15350946056' ? EstatusCompras.APROVADO : EstatusCompras.EM_VALIDACAO  
    });
    
    await this.save(compra);

    return compra;
  }

  async deleteCompra(id: string): Promise<void> {
    await this.delete(id);
  }
}




