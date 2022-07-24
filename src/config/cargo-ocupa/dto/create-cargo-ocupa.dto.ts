import { IsNotEmpty } from 'class-validator';
//  nom_cargo
export class CreateCargoOcupaDto {
  // @IsNotEmpty()
  // id_cargo: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  id_grupo_escala: string;
  @IsNotEmpty()
  id_categ_ocup: string;
  @IsNotEmpty()
  pago_perfecc: number;
  @IsNotEmpty()
  cuadro: string;
  @IsNotEmpty()
  calificador: string;
  @IsNotEmpty()
  cuadro_propio: string;
}
