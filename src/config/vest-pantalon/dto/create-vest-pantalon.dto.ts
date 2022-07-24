import { IsNotEmpty } from 'class-validator';
export class CreateVestPantalonDto {
  //  model dat_persona
  //  id_persona            String                 @id @default(dbgenerated("f_nuevouuid()")) @db.VarChar(36)
  @IsNotEmpty()
  talla_camisa: string; //?                @db.VarChar(36)
  @IsNotEmpty()
  talla_pantalon: string; //?                @db.VarChar(36)
  @IsNotEmpty()
  num_zapato: string; //?                @db.VarChar(36)
}
