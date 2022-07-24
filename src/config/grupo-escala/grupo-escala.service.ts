import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoEscalaDto } from './dto/create-grupo-escala.dto';
import { UpdateGrupoEscalaDto } from './dto/update-grupo-escala.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GrupoEscalaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGrupoEscalaDto: CreateGrupoEscalaDto) {
    // return 'This action adds a new grupoEscala';
    return this.prisma.nom_grupoescala.create({
      data: createGrupoEscalaDto,
    });
  }

  async findAll() {
    return this.prisma.nom_grupoescala.findMany();
  }

  async findOne(id: string) {
    const founded = await this.prisma.nom_grupoescala.findFirst({
      where: {
        id_grupo_escala: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateGrupoEscalaDto: UpdateGrupoEscalaDto) {
    // return `This action updates a #${id} grupoEscala`;
    const founded = await this.findOne(id);

    return await this.prisma.nom_grupoescala.update({
      where: {
        id_grupo_escala: founded.id_grupo_escala,
      },
      data: updateGrupoEscalaDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_grupoescala.delete({
      where: {
        id_grupo_escala: founded.id_grupo_escala,
      },
    });
  }
}
