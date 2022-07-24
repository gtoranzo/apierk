import { Module } from '@nestjs/common';
import { CargoMilitarService } from './cargo-militar.service';
import { CargoMilitarController } from './cargo-militar.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CargoMilitarController],
  providers: [CargoMilitarService, PrismaService],
})
export class CargoMilitarModule {}
