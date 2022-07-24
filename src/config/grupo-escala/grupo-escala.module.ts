import { Module } from '@nestjs/common';
import { GrupoEscalaService } from './grupo-escala.service';
import { GrupoEscalaController } from './grupo-escala.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [GrupoEscalaController],
  providers: [GrupoEscalaService, PrismaService],
})
export class GrupoEscalaModule {}
