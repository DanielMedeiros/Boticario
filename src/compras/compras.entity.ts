import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compras {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo: string;

  @Column()
  valor: number;

  @Column()
  data: Date;  

  @Column()
  cpf: string;
  
  @Column()
  status?: string;
}