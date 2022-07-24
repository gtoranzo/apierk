import { Module } from '@nestjs/common';
import { VestPantalonService } from './vest-pantalon.service';
import { VestPantalonController } from './vest-pantalon.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VestPantalonController],
  providers: [VestPantalonService, PrismaService],
})
export class VestPantalonModule {}
