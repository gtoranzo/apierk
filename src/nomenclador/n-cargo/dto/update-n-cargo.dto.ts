import { PartialType } from '@nestjs/swagger';
import { CreateNCargoDto } from './create-n-cargo.dto';

export class UpdateNCargoDto extends PartialType(CreateNCargoDto) {}
