import { PartialType } from '@nestjs/swagger';
import { CreateVestZapatoDto } from './create-vest-zapato.dto';

export class UpdateVestZapatoDto extends PartialType(CreateVestZapatoDto) {}
