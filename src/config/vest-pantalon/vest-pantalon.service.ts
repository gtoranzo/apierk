import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVestPantalonDto } from './dto/create-vest-pantalon.dto';
import { UpdateVestPantalonDto } from './dto/update-vest-pantalon.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VestPantalonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVestPantalonDto: CreateVestPantalonDto) {
    return this.prisma.dat_persona.create({
      data: createVestPantalonDto,
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

  async update(id: string, updateVestPantalonDto: UpdateVestPantalonDto) {
    const founded = await this.findOne(id);

    return await this.prisma.dat_persona.update({
      where: {
        id_persona: founded.id_persona,
      },
      data: updateVestPantalonDto,
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
