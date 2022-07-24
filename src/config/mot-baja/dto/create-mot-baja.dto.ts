import { IsNotEmpty } from 'class-validator';
//  nom_motivobaja
export class CreateMotBajaDto {
  // @IsNotEmpty()
  // id_motivo_baja: string;
  @IsNotEmpty()
  codigo: number;
  @IsNotEmpty()
  nombre: string;
}
