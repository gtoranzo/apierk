import { IsNotEmpty } from 'class-validator';
export class CreateCategoriaDto {
  //  nom_categocup
  // id_categ_ocup: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  codigo: number;
}
