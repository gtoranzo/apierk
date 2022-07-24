import { Module } from '@nestjs/common';
import { GradoMilitarService } from './grado-militar.service';
import { GradoMilitarController } from './grado-militar.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GradoMilitarController],
  providers: [GradoMilitarService, PrismaService],
})
export class GradoMilitarModule {}
