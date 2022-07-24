import { IsNotEmpty } from 'class-validator';

export class CreateNUnidadDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  codigo: number;
  @IsNotEmpty()
  idunidadsub: string;
  @IsNotEmpty()
  fueraprovincia: string;
  @IsNotEmpty()
  nombpersaut: string;
  @IsNotEmpty()
  cargopersaut: string;
}
