import { IsNotEmpty } from 'class-validator';

export class CreateNCargoDto {
  @IsNotEmpty()
  codigo: number;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  cuadro: string;
  @IsNotEmpty()
  calificador: string;
  @IsNotEmpty()
  idcategocup: string;
  @IsNotEmpty()
  idgrupoescala: string;
  @IsNotEmpty()
  pagoperfecc: number;
}
