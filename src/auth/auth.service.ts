import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RevendedorService } from 'src/revendedor/revendedor.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(      
      private revendedorService: RevendedorService,
        private jwtService: JwtService
      ) {}


  async validarRevendedor(email: string, senha: string): Promise<any> {
    const revendedor = await this.revendedorService.findOne(email);
    if (revendedor && bcrypt.compareSync(senha, revendedor.senha)) {
      const { senha, ...result } = revendedor;
      return result;
    }
    return null;
  }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
