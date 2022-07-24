import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PersonaController],
  providers: [PersonaService, PrismaService],
})
export class PersonaModule {}
