import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { VacantesPlantillaService } from './vacantes-plantilla.service';
import { CreateVacantesPlantillaDto } from './dto/create-vacantes-plantilla.dto';
import { UpdateVacantesPlantillaDto } from './dto/update-vacantes-plantilla.dto';
import { Response } from 'express';

@Controller('report-vp')
export class VacantesPlantillaController {
  constructor(
    private readonly vacantesPlantillaService: VacantesPlantillaService,
  ) {}

  @Get('vacantes-plantillas')
  async reporteVacantesPlantillas(@Res() res: Response): Promise<void> {
    const cont = await this.vacantesPlantillaService.findAll();
    const buffer =
      await this.vacantesPlantillaService.generatePDFreporteVacantesPlantillas(
        cont,
      );
    const name = 'test';
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=' + name + '.pdf',
      // 'Content-Disposition': 'attachment; filename=' + name + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Post()
  create(@Body() createVacantesPlantillaDto: CreateVacantesPlantillaDto) {
    return this.vacantesPlantillaService.create(createVacantesPlantillaDto);
  }

  @Get()
  findAll() {
    return this.vacantesPlantillaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacantesPlantillaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacantesPlantillaDto: UpdateVacantesPlantillaDto,
  ) {
    return this.vacantesPlantillaService.update(id, updateVacantesPlantillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacantesPlantillaService.remove(id);
  }
}
