import { Module } from '@nestjs/common'
import { RevendedorModule } from './revendedor/revendedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revendedor } from './revendedor/revendedor.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    RevendedorModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'testeboticario',
        entities: [Revendedor],
        synchronize: true,
      }),
      AuthModule,
         
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
