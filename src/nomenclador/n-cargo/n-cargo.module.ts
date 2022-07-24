import { Module } from '@nestjs/common';
import { NCargoService } from './n-cargo.service';
import { NCargoController } from './n-cargo.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NCargoController],
  providers: [NCargoService, PrismaModule],
})
export class NCargoModule {}
