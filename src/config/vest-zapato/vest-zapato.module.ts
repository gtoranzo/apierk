import { Module } from '@nestjs/common';
import { VestZapatoService } from './vest-zapato.service';
import { VestZapatoController } from './vest-zapato.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VestZapatoController],
  providers: [VestZapatoService, PrismaService],
})
export class VestZapatoModule {}
