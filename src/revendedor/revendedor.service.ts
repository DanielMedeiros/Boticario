import { Injectable, Logger } from '@nestjs/common';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RevendedorRepository } from './revendedor.repository';

@Injectable()
export class RevendedorService {
    private readonly logger = new Logger(RevendedorService.name);

    constructor(
        @InjectRepository(RevendedorRepository)
        private revendedorRepository: RevendedorRepository,
      ) {}

    async createRevendedor(createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {
        
        try {
          const revendedor = await this.revendedorRepository.createRevendedor(createRevendedorDTO);
          this.logger.log('Revendedor criado com sucesso.');
          return revendedor;
        } catch (error) {
          this.logger.error(`Falha ao criar um revendedor,  error ${error}`);
        }

        
      }

  async findOne(email: string): Promise<Revendedor | undefined> {
    return this.revendedorRepository.findOne({ email: email });
  }
}


