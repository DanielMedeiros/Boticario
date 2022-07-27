import { EntityRepository, Repository } from 'typeorm';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Revendedor)
export class RevendedorRepository extends Repository<Revendedor> {

  async createRevendedor(createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {
    
    const { nome, cpf, email, senha } =
      createRevendedorDTO;
    //const password = senha;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(senha, salt);

    const revendedor = this.create({
      nome,
      cpf,
      email,
      senha: hashedPassword
    });
    
    await this.save(revendedor);

    return revendedor;
  }

  async deleteCliente(id: string): Promise<void> {
    await this.delete(id);
  }
}




