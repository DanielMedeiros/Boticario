import { Column, Entity } from 'typeorm';

@Entity()
export class Codigo {  
  @Column()
  codigo: string;
  
}