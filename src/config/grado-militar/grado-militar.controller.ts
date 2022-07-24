import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradoMilitarService } from './grado-militar.service';
import { CreateGradoMilitarDto } from './dto/create-grado-militar.dto';
import { UpdateGradoMilitarDto } from './dto/update-grado-militar.dto';

@Controller('grado-militar')
export class GradoMilitarController {
  constructor(private readonly gradoMilitarService: GradoMilitarService) {}

  @Post()
  create(@Body() createGradoMilitarDto: CreateGradoMilitarDto) {
    return this.gradoMilitarService.create(createGradoMilitarDto);
  }

  @Get()
  findAll() {
    return this.gradoMilitarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradoMilitarService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradoMilitarDto: UpdateGradoMilitarDto) {
    return this.gradoMilitarService.update(id, updateGradoMilitarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradoMilitarService.remove(id);
  }
}
