import { PartialType } from '@nestjs/swagger';
import { CreateDesBajaDto } from './create-des-baja.dto';

export class UpdateDesBajaDto extends PartialType(CreateDesBajaDto) {}
