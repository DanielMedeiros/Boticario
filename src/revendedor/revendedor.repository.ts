import { EntityRepository, Repository } from 'typeorm';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';

@EntityRepository(Revendedor)
export class RevendedorRepository extends Repository<Revendedor> {

  async createRevendedor(createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {
    
    const { nome, cpf, email, senha } =
      createRevendedorDTO;

    const revendedor = this.create({
      nome,
      cpf,
      email,
      senha
    });
    
    await this.save(revendedor);

    return revendedor;
  }

  async deleteCliente(id: string): Promise<void> {
    await this.delete(id);
  }
}




