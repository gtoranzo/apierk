import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVestCamisaDto } from './dto/create-vest-camisa.dto';
import { UpdateVestCamisaDto } from './dto/update-vest-camisa.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VestCamisaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVestCamisaDto: CreateVestCamisaDto) {
    return this.prisma.dat_persona.create({
      data: createVestCamisaDto,
    });
  }

  async findAll() {
    return this.prisma.dat_persona.findMany();
  }

  async findOne(id: string) {
    const founded = await this.prisma.dat_persona.findFirst({
      where: {
        id_persona: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateVestCamisaDto: UpdateVestCamisaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.dat_persona.update({
      where: {
        id_persona: founded.id_persona,
      },
      data: updateVestCamisaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.dat_persona.delete({
      where: {
        id_persona: founded.id_persona,
      },
    });
  }
}
