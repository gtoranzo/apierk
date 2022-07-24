import { Module } from '@nestjs/common';
import { VestCamisaService } from './vest-camisa.service';
import { VestCamisaController } from './vest-camisa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VestCamisaController],
  providers: [VestCamisaService, PrismaService],
})
export class VestCamisaModule {}
