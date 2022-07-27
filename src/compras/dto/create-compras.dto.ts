import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComprasDTO {
  @ApiProperty({
    description: 'Codigo da compra',
    example: '123456',
    type: 'string',
  })
  @IsNotEmpty()  
  codigo: string;
 

  @ApiProperty({
    description: 'Valor da compra',
    example: '150',
    type: 'string',
  })
  @IsNotEmpty()  
  valor: number;

  @ApiProperty({
    description: 'Data da compra',
    example: '10-10-2010',
    type: 'string',
  })
  @IsNotEmpty()  
  data: string;

  @ApiProperty({
    description: 'CPF',
    example: '12345678999',
    type: 'string',
  })
  @IsNotEmpty()  
  cpf: string;

  @ApiProperty({
    description: 'Status da compra',
    example: 'Em validação',
    type: 'string',
  })  
  status?: string;
}
