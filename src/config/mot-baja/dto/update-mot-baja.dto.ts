import { PartialType } from '@nestjs/swagger';
import { CreateMotBajaDto } from './create-mot-baja.dto';

export class UpdateMotBajaDto extends PartialType(CreateMotBajaDto) {}
