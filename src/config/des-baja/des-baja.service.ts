import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesBajaDto } from './dto/create-des-baja.dto';
import { UpdateDesBajaDto } from './dto/update-des-baja.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DesBajaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDesBajaDto: CreateDesBajaDto) {
    return this.prisma.nom_destinobaja.create({
      data: createDesBajaDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_destinobaja.findMany();
    const total = await this.prisma.nom_destinobaja.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_destinobaja.findMany({
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
    const founded = await this.prisma.nom_destinobaja.findFirst({
      where: {
        id_destino_baja: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateDesBajaDto: UpdateDesBajaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_destinobaja.update({
      where: {
        id_destino_baja: founded.id_destino_baja,
      },
      data: updateDesBajaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_destinobaja.delete({
      where: {
        id_destino_baja: founded.id_destino_baja,
      },
    });
  }
}
