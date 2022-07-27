import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodigoDTO {
  @ApiProperty({
    description: 'Codigo da compra',
    example: '123456',
    type: 'string',
  })
  @IsNotEmpty()  
  codigo: string;
 
}
