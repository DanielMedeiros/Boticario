import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRevendedorDTO } from './dto/create-revendedor.dto';
import { Revendedor } from './revendedor.entity';
import { RevendedorService } from './revendedor.service';

@Controller('/revendedor')
export class RevendedorController {
    constructor(private revendedorService: RevendedorService) {}  

    @Post()
    @UsePipes(ValidationPipe)
    createRevendedor(@Body() createRevendedorDTO: CreateRevendedorDTO): Promise<Revendedor> {        
      return this.revendedorService.createRevendedor(createRevendedorDTO);
    }
}


