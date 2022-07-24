import { PartialType } from '@nestjs/swagger';
import { CreateNAreaDto } from './create-n-area.dto';

export class UpdateNAreaDto extends PartialType(CreateNAreaDto) {}
