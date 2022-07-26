import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Revendedor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  email: string;  

  @Column()
  senha: string;
  
}