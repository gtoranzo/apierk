import { IsNotEmpty } from 'class-validator';
//  nom_gradomilitar
export class CreateGradoMilitarDto {
  // @IsNotEmpty()
  // id_grado_militar: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  salario: number;
}
