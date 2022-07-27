import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CashBackAcumuladoDTO {
  @ApiProperty({
    description: 'Credito acumulado',
    example: '123456',
    type: 'string',
  })
  @IsNotEmpty()  
  credit: number;
 
}
