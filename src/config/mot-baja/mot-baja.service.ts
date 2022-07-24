import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMotBajaDto } from './dto/create-mot-baja.dto';
import { UpdateMotBajaDto } from './dto/update-mot-baja.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MotBajaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMotBajaDto: CreateMotBajaDto) {
    return this.prisma.nom_motivobaja.create({
      data: createMotBajaDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_motivobaja.findMany();
    const total = await this.prisma.nom_motivobaja.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_motivobaja.findMany({
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
    const founded = await this.prisma.nom_motivobaja.findFirst({
      where: {
        id_motivo_baja: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateMotBajaDto: UpdateMotBajaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_motivobaja.update({
      where: {
        id_motivo_baja: founded.id_motivo_baja,
      },
      data: updateMotBajaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_motivobaja.delete({
      where: {
        id_motivo_baja: founded.id_motivo_baja,
      },
    });
  }
}
