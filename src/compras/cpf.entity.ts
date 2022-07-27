import { Column, Entity } from 'typeorm';

@Entity()
export class CPF {  
  @Column()
  cpf: string;
  
}