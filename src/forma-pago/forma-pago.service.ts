import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormaPagoDto } from './dto/create-forma-pago.dto';
import { UpdateFormaPagoDto } from './dto/update-forma-pago.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormaPagoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFormaPagoDto: CreateFormaPagoDto) {
    return this.prisma.nom_formapago.create({
      data: createFormaPagoDto,
    });
  }

  async findAll(pagination) {
    // return this.prisma.nom_formapago.findMany();
    const total = await this.prisma.nom_formapago.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);
    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    const result = await this.prisma.nom_formapago.findMany({
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
    const founded = await this.prisma.nom_formapago.findFirst({
      where: {
        id_forma_pago: id,
      },
    });
    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: string, updateFormaPagoDto: UpdateFormaPagoDto) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_formapago.update({
      where: {
        id_forma_pago: founded.id_forma_pago,
      },
      data: updateFormaPagoDto,
    });
  }

  async remove(id: string) {
    const founded = await this.findOne(id);

    return await this.prisma.nom_formapago.delete({
      where: {
        id_forma_pago: founded.id_forma_pago,
      },
    });
  }
}
