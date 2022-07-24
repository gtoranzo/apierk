import { IsNotEmpty } from 'class-validator';
//  model nom_grupoescala
export class CreateGrupoEscalaDto {
  // @IsNotEmpty()
  // id_grupo_escala: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  salario: number;
}
