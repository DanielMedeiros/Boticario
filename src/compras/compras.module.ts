import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprasController } from './compras.controller';
import { ComprasRepository } from './compras.repository';
import { ComprasService } from './compras.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComprasRepository])],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService]
})
export class ComprasModule {}
