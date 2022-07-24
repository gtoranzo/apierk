import { PartialType } from '@nestjs/swagger';
import { CreateVacantesPlantillaDto } from './create-vacantes-plantilla.dto';

export class UpdateVacantesPlantillaDto extends PartialType(CreateVacantesPlantillaDto) {}
