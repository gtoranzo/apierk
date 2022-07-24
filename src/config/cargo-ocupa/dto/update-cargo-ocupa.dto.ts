import { PartialType } from '@nestjs/swagger';
import { CreateCargoOcupaDto } from './create-cargo-ocupa.dto';

export class UpdateCargoOcupaDto extends PartialType(CreateCargoOcupaDto) {}
