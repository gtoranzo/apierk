import { Module } from '@nestjs/common';
import { FormaPagoService } from './forma-pago.service';
import { FormaPagoController } from './forma-pago.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FormaPagoController],
  providers: [FormaPagoService, PrismaService],
})
export class FormaPagoModule {}
