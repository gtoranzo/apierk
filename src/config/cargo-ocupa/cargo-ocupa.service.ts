import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoOcupaDto } from './dto/create-cargo-ocupa.dto';
import { UpdateCargoOcupaDto } from './dto/update-cargo-ocupa.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CargoOcupaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCargoOcupaDto: CreateCargoOcupaDto) {
    return this.prisma.nom_cargo.create({
      data: createCargoOcupaDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_cargo.findMany({
    //   include: {
    //     nom_categocup: true,
    //     nom_grupoescala: true,
    //   },
    // });
    const total = await this.prisma.nom_cargo.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_cargo.findMany({
      include: {
        nom_categocup: true,
        nom_grupoescala: true,
      },
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
    const founded = await this.prisma.nom_cargo.findFirst({
      where: {
        id_cargo: id,
      },
      include: {
        nom_categocup: true,
        nom_grupoescala: true,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateCargoOcupaDto: UpdateCargoOcupaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_cargo.update({
      where: {
        id_cargo: founded.id_cargo,
      },
      data: updateCargoOcupaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_cargo.delete({
      where: {
        id_cargo: founded.id_cargo,
      },
    });
  }
}
