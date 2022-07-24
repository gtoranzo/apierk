import { Injectable } from '@nestjs/common';
import { CreateNUnidadDto } from './dto/create-n-unidad.dto';
import { UpdateNUnidadDto } from './dto/update-n-unidad.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NUnidadService {
  constructor(private readonly prisma: PrismaService) {}

  create(createNUnidadDto: CreateNUnidadDto) {
    return 'This action adds a new nUnidad';
  }

  async findAll(pagination) {
    return await this.prisma.dat_unidad.findMany();
  }

  async selectAll() {
    return await this.prisma.dat_unidad.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} nUnidad`;
  }

  update(id: string, updateNUnidadDto: UpdateNUnidadDto) {
    return `This action updates a #${id} nUnidad`;
  }

  remove(id: string) {
    return `This action removes a #${id} nUnidad`;
  }
}
