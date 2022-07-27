import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';
import { RevendedorService } from './revendedor.service';

@Controller('/revendedor')
export class RevendedorController {
    constructor(private revendedorService: RevendedorService) {}  

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

    @Post()
    @UsePipes(ValidationPipe)
    createRevendedor(@Body() createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {        
      return this.revendedorService.createRevendedor(createRevendedorDTO);
    }


}


