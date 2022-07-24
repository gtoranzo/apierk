import { PartialType } from '@nestjs/swagger';
import { CreateGradoMilitarDto } from './create-grado-militar.dto';

export class UpdateGradoMilitarDto extends PartialType(CreateGradoMilitarDto) {}
