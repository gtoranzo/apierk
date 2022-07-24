import { Module } from '@nestjs/common';
import { MotBajaService } from './mot-baja.service';
import { MotBajaController } from './mot-baja.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MotBajaController],
  providers: [MotBajaService, PrismaService],
})
export class MotBajaModule {}
