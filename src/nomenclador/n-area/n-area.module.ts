import { Module } from '@nestjs/common';
import { NAreaService } from './n-area.service';
import { NAreaController } from './n-area.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NAreaController],
  providers: [NAreaService, PrismaModule],
})
export class NAreaModule {}
