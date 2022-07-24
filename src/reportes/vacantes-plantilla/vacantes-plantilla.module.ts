import { Module } from '@nestjs/common';
import { VacantesPlantillaService } from './vacantes-plantilla.service';
import { VacantesPlantillaController } from './vacantes-plantilla.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VacantesPlantillaController],
  providers: [VacantesPlantillaService, PrismaService],
})
export class VacantesPlantillaModule {}
