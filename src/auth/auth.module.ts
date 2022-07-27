import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RevendedorModule } from 'src/revendedor/revendedor.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants.ts';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ 
    RevendedorModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports:[JwtModule, AuthService]
})
export class AuthModule {}
