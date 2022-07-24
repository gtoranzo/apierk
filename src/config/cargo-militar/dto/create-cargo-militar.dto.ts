import { IsNotEmpty } from 'class-validator';
//  nom_cargomilitar
export class CreateCargoMilitarDto {
  // @IsNotEmpty()
  // id_cargo_militar: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  salario: number;
}
