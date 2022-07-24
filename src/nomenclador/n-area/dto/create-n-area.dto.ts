import { IsNotEmpty } from 'class-validator';

export class CreateNAreaDto {
  @IsNotEmpty()
  codigo: number;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  idunidad: string;
  @IsNotEmpty()
  idareasub: string;
}
