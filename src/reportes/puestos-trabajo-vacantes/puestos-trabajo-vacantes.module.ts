import { Module } from '@nestjs/common';
import { PuestosTrabajoVacantesService } from './puestos-trabajo-vacantes.service';
import { PuestosTrabajoVacantesController } from './puestos-trabajo-vacantes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PuestosTrabajoVacantesController],
  providers: [PuestosTrabajoVacantesService, PrismaService],
})
export class PuestosTrabajoVacantesModule {}
