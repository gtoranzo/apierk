import { Module } from '@nestjs/common';
import { NUnidadService } from './n-unidad.service';
import { NUnidadController } from './n-unidad.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NUnidadController],
  providers: [NUnidadService, PrismaModule],
  exports: [NUnidadService],
})
export class NUnidadModule {}
