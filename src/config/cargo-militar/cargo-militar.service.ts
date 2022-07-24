import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoMilitarDto } from './dto/create-cargo-militar.dto';
import { UpdateCargoMilitarDto } from './dto/update-cargo-militar.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CargoMilitarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCargoMilitarDto: CreateCargoMilitarDto) {
    return this.prisma.nom_cargomilitar.create({
      data: createCargoMilitarDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_cargomilitar.findMany();
    const total = await this.prisma.nom_cargomilitar.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_cargomilitar.findMany({
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
    const founded = await this.prisma.nom_cargomilitar.findFirst({
      where: {
        id_cargo_militar: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateCargoMilitarDto: UpdateCargoMilitarDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_cargomilitar.update({
      where: {
        id_cargo_militar: founded.id_cargo_militar,
      },
      data: updateCargoMilitarDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_cargomilitar.delete({
      where: {
        id_cargo_militar: founded.id_cargo_militar,
      },
    });
  }
}
