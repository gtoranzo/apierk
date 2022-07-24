import { Module } from '@nestjs/common';
import { CargoOcupaService } from './cargo-ocupa.service';
import { CargoOcupaController } from './cargo-ocupa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CargoOcupaController],
  providers: [CargoOcupaService, PrismaService],
})
export class CargoOcupaModule {}
