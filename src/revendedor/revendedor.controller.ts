import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';
import { RevendedorService } from './revendedor.service';
import { AuthService } from '../auth/auth.service';

@Controller('revendedor')
export class RevendedorController {
  constructor(
    private revendedorService: RevendedorService,
    private authService: AuthService
    ) { }  

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

    @Post()
    @UsePipes(ValidationPipe)
    createRevendedor(@Body() createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {        
      return this.revendedorService.createRevendedor(createRevendedorDTO);
    }


}


