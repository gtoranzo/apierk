import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonaDto: CreatePersonaDto) {
    return this.prisma.dat_persona.create({
      data: createPersonaDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.dat_persona.findMany();
    const total = await this.prisma.dat_persona.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.dat_persona.findMany({
      skip: pagination.rowsPerPage * (pagination.page - 1),
      take: pagination.rowsPerPage,
      orderBy: {
        nombre: 'asc',
      },
    });
    return {
      data: result,
      count: total,
    };
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

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.dat_persona.update({
      where: {
        id_persona: founded.id_persona,
      },
      data: updatePersonaDto,
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
