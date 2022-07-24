import { PartialType } from '@nestjs/swagger';
import { CreateNUnidadDto } from './create-n-unidad.dto';

export class UpdateNUnidadDto extends PartialType(CreateNUnidadDto) {}
