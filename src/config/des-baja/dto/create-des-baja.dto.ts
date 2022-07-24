import { IsNotEmpty } from 'class-validator';
//  nom_destinobaja
export class CreateDesBajaDto {
  // @IsNotEmpty()
  // id_destino_baja: string;
  @IsNotEmpty()
  nombre: string;
}
