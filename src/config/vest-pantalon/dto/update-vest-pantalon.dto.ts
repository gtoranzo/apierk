import { PartialType } from '@nestjs/swagger';
import { CreateVestPantalonDto } from './create-vest-pantalon.dto';

export class UpdateVestPantalonDto extends PartialType(CreateVestPantalonDto) {}
