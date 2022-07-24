import { PartialType } from '@nestjs/swagger';
import { CreateCargoMilitarDto } from './create-cargo-militar.dto';

export class UpdateCargoMilitarDto extends PartialType(CreateCargoMilitarDto) {}
