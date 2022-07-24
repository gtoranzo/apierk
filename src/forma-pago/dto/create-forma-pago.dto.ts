import { IsNotEmpty } from 'class-validator';
export class CreateFormaPagoDto {
  // model nom_formapago
  // id_forma_pago String         @id @default(dbgenerated("f_nuevouuid()")) @db.VarChar(36)
  @IsNotEmpty()
  nombre: string; //         @db.VarChar(36)
  @IsNotEmpty()
  tipo: string; //         @db.VarChar(36)
  //dat_contrato  dat_contrato[]
}
