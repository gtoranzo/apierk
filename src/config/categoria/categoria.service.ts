import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.nom_categocup.create({
      data: createCategoriaDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_categocup.findMany();
    const total = await this.prisma.nom_categocup.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_categocup.findMany({
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
    const founded = await this.prisma.nom_categocup.findFirst({
      where: {
        id_categ_ocup: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_categocup.update({
      where: {
        id_categ_ocup: founded.id_categ_ocup,
      },
      data: updateCategoriaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_categocup.delete({
      where: {
        id_categ_ocup: founded.id_categ_ocup,
      },
    });
  }
}
