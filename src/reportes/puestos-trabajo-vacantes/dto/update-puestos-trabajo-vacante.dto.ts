import { PartialType } from '@nestjs/swagger';
import { CreatePuestosTrabajoVacanteDto } from './create-puestos-trabajo-vacante.dto';

export class UpdatePuestosTrabajoVacanteDto extends PartialType(CreatePuestosTrabajoVacanteDto) {}
