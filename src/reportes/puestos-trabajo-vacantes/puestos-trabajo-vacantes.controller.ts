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
import { PuestosTrabajoVacantesService } from './puestos-trabajo-vacantes.service';
import { CreatePuestosTrabajoVacanteDto } from './dto/create-puestos-trabajo-vacante.dto';
import { UpdatePuestosTrabajoVacanteDto } from './dto/update-puestos-trabajo-vacante.dto';
import { Response } from 'express';

@Controller('report-v')
export class PuestosTrabajoVacantesController {
  constructor(
    private readonly puestosTrabajoVacantesService: PuestosTrabajoVacantesService,
  ) {}

  @Get('vacantes')
  async reporteVacantes(@Res() res: Response): Promise<void> {
    const cont = await this.puestosTrabajoVacantesService.findAll();
    const buffer =
      await this.puestosTrabajoVacantesService.generatePDFreporteVacantes(cont);
    const name = 'test';
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=' + name + '.pdf',
      // 'Content-Disposition': 'attachment; filename=' + name + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  // @Get('vacantes-unidad')
  // async reporteVacantesUnidad(@Res() res: Response): Promise<void> {
  //   const cont =
  //     await this.puestosTrabajoVacantesService.getInfoReporteUnidad();
  //   const buffer =
  //     await this.puestosTrabajoVacantesService.generatePDFreporteVacantes(cont);
  //   const name = 'test';
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=' + name + '.pdf',
  //     // 'Content-Disposition': 'attachment; filename=' + name + '.pdf',
  //     'Content-Length': buffer.length,
  //   });
  //   res.end(buffer);
  // }
  //
  // @Get('vacantes-categoria')
  // async reporteVacantesCategoria(@Res() res: Response): Promise<void> {
  //   const cont =
  //     await this.puestosTrabajoVacantesService.getInfoReporteCategoria();
  //   const buffer =
  //     await this.puestosTrabajoVacantesService.generatePDFreporteVacantes(cont);
  //   const name = 'test';
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=' + name + '.pdf',
  //     // 'Content-Disposition': 'attachment; filename=' + name + '.pdf',
  //     'Content-Length': buffer.length,
  //   });
  //   res.end(buffer);
  // }

  @Post()
  create(
    @Body() createPuestosTrabajoVacanteDto: CreatePuestosTrabajoVacanteDto,
  ) {
    return this.puestosTrabajoVacantesService.create(
      createPuestosTrabajoVacanteDto,
    );
  }

  @Get()
  findAll() {
    return this.puestosTrabajoVacantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puestosTrabajoVacantesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePuestosTrabajoVacanteDto: UpdatePuestosTrabajoVacanteDto,
  ) {
    return this.puestosTrabajoVacantesService.update(
      id,
      updatePuestosTrabajoVacanteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puestosTrabajoVacantesService.remove(id);
  }
}
