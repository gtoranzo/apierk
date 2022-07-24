import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NUnidadService } from './n-unidad.service';
import { CreateNUnidadDto } from './dto/create-n-unidad.dto';
import { UpdateNUnidadDto } from './dto/update-n-unidad.dto';

@Controller('n-unidad')
export class NUnidadController {
  constructor(private readonly nUnidadService: NUnidadService) {}

  @Post()
  create(@Body() createNUnidadDto: CreateNUnidadDto) {
    return this.nUnidadService.create(createNUnidadDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.nUnidadService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nUnidadService.findOne(id);
  }

  @Get()
  selectAll() {
    return this.nUnidadService.selectAll();
  }

  @Patch('editar/:id')
  update(@Param('id') id: string, @Body() updateNUnidadDto: UpdateNUnidadDto) {
    return this.nUnidadService.update(id, updateNUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nUnidadService.remove(id);
  }
}
