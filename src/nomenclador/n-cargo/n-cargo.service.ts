import { Injectable } from '@nestjs/common';
import { CreateNCargoDto } from './dto/create-n-cargo.dto';
import { UpdateNCargoDto } from './dto/update-n-cargo.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NCargoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createNCargoDto: CreateNCargoDto) {
    return 'This action adds a new nCargo';
  }

  async findAll(pagination) {
    return await this.prisma.nom_cargo.findMany();
  }

  async selectAll() {
    return await this.prisma.nom_cargo.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} nCargo`;
  }

  update(id: number, updateNCargoDto: UpdateNCargoDto) {
    return `This action updates a #${id} nCargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} nCargo`;
  }
}
