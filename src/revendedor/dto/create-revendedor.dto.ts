import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateRevendedorDTO {
  @ApiProperty({
    description: 'Nome do revendedor',
    example: 'Joao da Silva',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;
 

  @ApiProperty({
    description: 'CPF',
    example: '12345678989',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Email',
    example: 'nomedorevendedor@email',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  senha: string;
}
