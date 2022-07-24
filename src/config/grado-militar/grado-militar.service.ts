import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradoMilitarDto } from './dto/create-grado-militar.dto';
import { UpdateGradoMilitarDto } from './dto/update-grado-militar.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GradoMilitarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGradoMilitarDto: CreateGradoMilitarDto) {
    return this.prisma.nom_gradomilitar.create({
      data: createGradoMilitarDto,
    });
  }

  async findAll() {
    return this.prisma.nom_gradomilitar.findMany();
  }

  async findOne(id: string) {
    const founded = await this.prisma.nom_gradomilitar.findFirst({
      where: {
        id_grado_militar: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateGradoMilitarDto: UpdateGradoMilitarDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_gradomilitar.update({
      where: {
        id_grado_militar: founded.id_grado_militar,
      },
      data: updateGradoMilitarDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_gradomilitar.delete({
      where: {
        id_grado_militar: founded.id_grado_militar,
      },
    });
  }
}
