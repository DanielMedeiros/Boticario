import { Module } from '@nestjs/common';
import { RevendedorRepository } from './revendedor.repository';
import { RevendedorService } from './revendedor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevendedorController } from './revendedor.controller';

@Module({
  imports:[TypeOrmModule.forFeature([RevendedorRepository])],
  controllers: [RevendedorController],
  providers: [RevendedorService]
})
export class RevendedorModule {}
