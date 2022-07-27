import { forwardRef, Module } from '@nestjs/common';
import { RevendedorRepository } from './revendedor.repository';
import { RevendedorService } from './revendedor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevendedorController } from './revendedor.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([RevendedorRepository])
  ],
  controllers: [RevendedorController],
  providers: [RevendedorService],
  exports: [RevendedorService]
})
export class RevendedorModule {}
