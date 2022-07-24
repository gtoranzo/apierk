import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, PrismaService],
  imports: [PrismaModule],
  // exports: [CategoriaService],
})
export class CategoriaModule {}
