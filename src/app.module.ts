import { Module } from '@nestjs/common'
import { RevendedorModule } from './revendedor/revendedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revendedor } from './revendedor/revendedor.entity';
import { AuthModule } from './auth/auth.module';
import { ComprasModule } from './compras/compras.module';
import { Compras } from './compras/compras.entity';
import { CashbackModule } from './cashback/cashback.module';


@Module({
  imports: [    
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'testeboticario',
        entities: [Revendedor, Compras],
        synchronize: true,
      }),
      AuthModule,
      ComprasModule,
      CashbackModule,
         
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
