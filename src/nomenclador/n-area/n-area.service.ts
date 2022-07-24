import { Injectable } from '@nestjs/common';
import { CreateNAreaDto } from './dto/create-n-area.dto';
import { UpdateNAreaDto } from './dto/update-n-area.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NAreaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createNAreaDto: CreateNAreaDto) {
    return 'This action adds a new nArea';
  }

  async findAll(pagination) {
    return await this.prisma.dat_area.findMany();
  }

  async selectAll() {
    return await this.prisma.dat_area.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} nArea`;
  }

  update(id: string, updateNAreaDto: UpdateNAreaDto) {
    return `This action updates a #${id} nArea`;
  }

  remove(id: string) {
    return `This action removes a #${id} nArea`;
  }
}
