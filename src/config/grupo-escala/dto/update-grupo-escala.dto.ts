import { PartialType } from '@nestjs/swagger';
import { CreateGrupoEscalaDto } from './create-grupo-escala.dto';

export class UpdateGrupoEscalaDto extends PartialType(CreateGrupoEscalaDto) {}
