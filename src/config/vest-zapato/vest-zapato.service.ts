import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVestZapatoDto } from './dto/create-vest-zapato.dto';
import { UpdateVestZapatoDto } from './dto/update-vest-zapato.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VestZapatoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVestZapatoDto: CreateVestZapatoDto) {
    return this.prisma.dat_persona.create({
      data: createVestZapatoDto,
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

  async update(id: string, updateVestZapatoDto: UpdateVestZapatoDto) {
    const founded = await this.findOne(id);

    return await this.prisma.dat_persona.update({
      where: {
        id_persona: founded.id_persona,
      },
      data: updateVestZapatoDto,
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

  // async generatePDF(): Promise<Buffer> {
  //   const rep = await this.findAll();
  //   const pdfBuffer: Buffer = await new Promise((resolve) => {
  //     const doc = new PDFDocument({
  //       size: 'LETTER',
  //       bufferPages: true,
  //     });
  //
  //     // customize your PDF document
  //     this.generateHeader(doc);
  //     this.generateTable(doc, rep);
  //     this.generateFooter(doc);
  //     doc.end();
  //
  //     const buffer = [];
  //     doc.on('data', buffer.push.bind(buffer));
  //     doc.on('end', () => {
  //       const data = Buffer.concat(buffer);
  //       resolve(data);
  //     });
  //   });
  //
  //   return pdfBuffer;
  // }
  //
  // generateHeader(doc: PDFKit.PDFDocument) {
  //   doc
  //     .image('src/assets/eurek.png', 30, 30, { width: 25 })
  //     .fillColor('#444444')
  //     .fontSize(10)
  //     .text('Eureka – Sistema de Gestión de Recursos Humanos.', 60, 40)
  //     .fontSize(10)
  //     .text('Página  de ' + doc.bufferedPageRange().count, 200, 40, {
  //       align: 'right',
  //     })
  //     .text('Fecha: ' + this.formatDate(new Date()), 200, 55, {
  //       align: 'right',
  //     })
  //     .moveDown();
  // }
  //
  // generateFooter(doc: PDFKit.PDFDocument) {
  //   doc.fontSize(10).text('Números de Zapatos.', 50, 700, {
  //     align: 'center',
  //     width: 500,
  //   });
  // }

  // generateTableRow(doc, y, nombre) {
  //   doc.fontSize(10).text(nombre, 100, y);
  // }
  //
  // generateTable(doc, rep) {
  //   const TableTop = 110;
  //
  //   doc.font('Helvetica-Bold');
  //   this.generateTableRow(doc, TableTop, 'nombre');
  //   this.generateHr(doc, TableTop + 20);
  //   doc.font('Helvetica');
  //
  //   for (let i = 0; i < rep.length; i++) {
  //     const item = rep[i];
  //     const position = TableTop + (i + 1) * 30;
  //     this.generateTableRow(doc, position, item.nombre);
  //   }
  // }

  // generateHr(doc, y) {
  //   doc
  //     .strokeColor('#aaaaaa')
  //     .lineWidth(1)
  //     .moveTo(50, y)
  //     .lineTo(550, y)
  //     .stroke();
  // }
  //
  // // formatCurrency(cents) {
  // //   return '$' + (cents / 100).toFixed(2);
  // // }

  // formatDate(date) {
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //
  //   return year + '/' + month + '/' + day;
  // }
}
