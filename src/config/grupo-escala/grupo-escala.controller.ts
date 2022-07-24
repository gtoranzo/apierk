import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrupoEscalaService } from './grupo-escala.service';
import { CreateGrupoEscalaDto } from './dto/create-grupo-escala.dto';
import { UpdateGrupoEscalaDto } from './dto/update-grupo-escala.dto';

@Controller('grupo-escala')
export class GrupoEscalaController {
  constructor(private readonly grupoEscalaService: GrupoEscalaService) {}

  @Post()
  create(@Body() createGrupoEscalaDto: CreateGrupoEscalaDto) {
    return this.grupoEscalaService.create(createGrupoEscalaDto);
  }

  @Get()
  findAll() {
    return this.grupoEscalaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoEscalaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrupoEscalaDto: UpdateGrupoEscalaDto,
  ) {
    return this.grupoEscalaService.update(id, updateGrupoEscalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoEscalaService.remove(id);
  }
}
