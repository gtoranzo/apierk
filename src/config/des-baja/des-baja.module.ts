import { Module } from '@nestjs/common';
import { DesBajaService } from './des-baja.service';
import { DesBajaController } from './des-baja.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DesBajaController],
  providers: [DesBajaService, PrismaService],
})
export class DesBajaModule {}
