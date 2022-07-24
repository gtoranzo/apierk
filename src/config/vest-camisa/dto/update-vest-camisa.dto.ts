import { PartialType } from '@nestjs/swagger';
import { CreateVestCamisaDto } from './create-vest-camisa.dto';

export class UpdateVestCamisaDto extends PartialType(CreateVestCamisaDto) {}
