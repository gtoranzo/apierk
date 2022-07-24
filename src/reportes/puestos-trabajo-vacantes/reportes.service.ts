import { Injectable } from '@nestjs/common';
// import { CreateReporteDto } from './dto/create-reporte.dto';
// import { UpdateReporteDto } from './dto/update-reporte.dto';
import * as PDFDocument from 'pdfkit';
// gui
@Injectable()
export class ReportesService {
  async generatePDFreporteFuerzaLaboralCatYCont(cont: any): Promise<Buffer> {
    const rep = cont;
    console.log(cont);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      this.generateHeader(
        doc,
        'Fuerza Laboral Por Categoría Ocupacional y Tipo de Contrato',
      );
      doc.moveDown();
      this.generateTable(doc, rep);
      // this.generateFooter(doc);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  generateHeader(doc, titulo) {
    doc
      .image('src/assets/eurek.png', 30, 30, { width: 25 })
      .fillColor('#444444')
      .fontSize(10)
      .text('Eureka – Sistema de Gestión de Recursos Humanos.', 60, 40)
      .fontSize(10)
      .text('Página  de ' + doc.bufferedPageRange().count, 200, 40, {
        align: 'right',
      })
      .text('Fecha: ' + this.formatDate(new Date()), 200, 55, {
        align: 'right',
      });
    doc.moveDown();
    doc.fontSize(15).text(titulo, 30, 80);
  }

  // generateFooter(doc) {
  //   doc.fontSize(10).text('Ejemplo.', 50, 700, {
  //     align: 'center',
  //     width: 500,
  //   });
  // }

  generateTableRow(
    doc,
    y,
    uniCatTipCont,
    total,
    edadP,
    directo,
    indirecto,
    militares,
    mujeres,
  ) {
    doc
      .fontSize(8)
      .text(uniCatTipCont, 30, y)
      .text(total, 250, y)
      .text(edadP, 280, y)
      .text(directo, 350, y)
      .text(indirecto, 400, y)
      .text(militares, 450, y)
      .text(mujeres, 505, y);
  }

  generateTable(doc, info) {
    const TableTop = 115;
    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      TableTop,
      'Unidades/Categoría/Tipo Contrato',
      'TOTAL',
      'Edad Promedio',
      'Directo',
      'Indirecto',
      'Militares',
      'Mujeres',
    );
    this.generateHr(doc, TableTop + 10);
    doc.font('Helvetica');

    let totalCategoria = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let totalUnidad = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let unidad = '';
    let categoria = '';
    let position = TableTop + 15;
    for (let i = 0; i < info.length; i++) {
      const item = info[i];
      if (unidad == '' || unidad != item.unidad) {
        doc.font('Helvetica-Bold');
        doc.fillColor('blue');
        this.generateTableRow(
          doc,
          position,
          item.unidad,
          '',
          '',
          '',
          '',
          '',
          '',
        );
        doc.font('Helvetica');
        doc.fillColor('#444444');

        position = position + 15;
        unidad = item.unidad;
      } else {
        unidad = item.unidad;
      }
      if (categoria == '' || categoria != item.categoria) {
        doc.font('Helvetica-Oblique');

        this.generateTableRow(
          doc,
          position,
          item.categoria,
          '',
          '',
          '',
          '',
          '',
          '',
        );
        doc.font('Helvetica');
        position = position + 15;
        categoria = item.categoria;
      } else categoria = item.categoria;
      this.generateTableRow(
        doc,
        position,
        item.tipocontrato,
        item.total,
        item.promedioedad,
        item.directos,
        item.indirectos,
        item.militares,
        item.mujeres,
      );
      totalUnidad.cont = totalUnidad.cont + 1;
      position = position + 15;
      totalCategoria.total = totalCategoria.total + item.total;
      totalCategoria.cont = totalCategoria.cont + 1;
      totalCategoria.edadPromedio =
        totalCategoria.edadPromedio + item.promedioedad;
      totalCategoria.directo = totalCategoria.directo + item.directos;
      totalCategoria.indirecto = totalCategoria.indirecto + item.indirectos;
      totalCategoria.militares = totalCategoria.militares + item.militares;
      totalCategoria.mujeres = totalCategoria.mujeres + item.mujeres;

      if (i + 1 <= info.length - 1) {
        if (categoria != info[i + 1].categoria) {
          totalUnidad.total = totalUnidad.total + totalCategoria.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalCategoria.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalCategoria.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalCategoria.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
          this.generateTableRow(
            doc,
            position,
            'TOTAL Categoría:',
            totalCategoria.total,
            (totalCategoria.edadPromedio / totalCategoria.cont).toFixed(1),
            totalCategoria.directo,
            totalCategoria.indirecto,
            totalCategoria.militares,
            totalCategoria.mujeres,
          );
          totalCategoria = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
          position = position + 15;
        }
        if (unidad != info[i + 1].unidad) {
          totalUnidad.total = totalUnidad.total + totalCategoria.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalCategoria.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalCategoria.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalCategoria.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
          this.generateTableRow(
            doc,
            position,
            'TOTAL Unidad:',
            totalUnidad.total,
            (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
            totalUnidad.directo,
            totalUnidad.indirecto,
            totalUnidad.militares,
            totalUnidad.mujeres,
          );
          totalUnidad = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
          position = position + 15;
        }
      } else {
        totalUnidad.total = totalUnidad.total + totalCategoria.total;
        totalUnidad.edadPromedio =
          totalUnidad.edadPromedio + totalCategoria.edadPromedio;
        totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
        totalUnidad.indirecto =
          totalUnidad.indirecto + totalCategoria.indirecto;
        totalUnidad.militares =
          totalUnidad.militares + totalCategoria.militares;
        totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
        this.generateTableRow(
          doc,
          position,
          'TOTAL Categoría:',
          totalCategoria.total,
          (totalCategoria.edadPromedio / totalCategoria.cont).toFixed(1),
          totalCategoria.directo,
          totalCategoria.indirecto,
          totalCategoria.militares,
          totalCategoria.mujeres,
        );
        totalCategoria = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        position = position + 15;
        this.generateTableRow(
          doc,
          position,
          'TOTAL Unidad:',
          totalUnidad.total,
          (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
          totalUnidad.directo,
          totalUnidad.indirecto,
          totalUnidad.militares,
          totalUnidad.mujeres,
        );
        totalUnidad = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        position = position + 15;
      }
      // if (categoria != info[i + 1].categoria) {
      //   totalUnidad.total = totalUnidad.total + totalCategoria.total;
      //   totalUnidad.edadPromedio =
      //     totalUnidad.edadPromedio + totalCategoria.edadPromedio;
      //   totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
      //   totalUnidad.indirecto =
      //     totalUnidad.indirecto + totalCategoria.indirecto;
      //   totalUnidad.militares =
      //     totalUnidad.militares + totalCategoria.militares;
      //   totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
      //   this.generateTableRow(
      //     doc,
      //     position,
      //     'TOTAL Categoría:',
      //     totalCategoria.total,
      //     totalCategoria.edadPromedio,
      //     totalCategoria.directo,
      //     totalCategoria.indirecto,
      //     totalCategoria.militares,
      //     totalCategoria.mujeres,
      //   );
      //   totalCategoria = {
      //     total: 0,
      //     edadPromedio: 0,
      //     directo: 0,
      //     indirecto: 0,
      //     militares: 0,
      //     mujeres: 0,
      //   };
      //   position = position + 15;
      // }
    }
  }

  generateHr(doc, y) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(30, y)
      .lineTo(540, y)
      .stroke();
  }

  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + '/' + month + '/' + day;
  }
// gui
  async generatePDFreporteFuerzaLaboralCat(cont: any): Promise<Buffer> {
    const rep = cont;
    console.log(cont);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      this.generateHeader(doc, 'Fuerza Laboral Por Categoría Ocupacional');
      doc.moveDown();
      this.generateTableCat(doc, rep);
      // this.generateFooter(doc);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  generateTableRowCat(
    doc,
    y,
    uniCat,
    total,
    edadP,
    directo,
    indirecto,
    militares,
    mujeres,
  ) {
    doc
      .fontSize(8)
      .text(uniCat, 30, y)
      .text(total, 250, y)
      .text(edadP, 280, y)
      .text(directo, 350, y)
      .text(indirecto, 400, y)
      .text(militares, 450, y)
      .text(mujeres, 505, y);
  }

  generateTableCat(doc, info) {
    const TableTop = 115;
    doc.font('Helvetica-Bold');
    this.generateTableRowCat(
      doc,
      TableTop,
      'Unidades/Categoría',
      'TOTAL',
      'Edad Promedio',
      'Directo',
      'Indirecto',
      'Militares',
      'Mujeres',
    );
    this.generateHr(doc, TableTop + 10);
    doc.font('Helvetica');

    let totalCategoria = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let totalUnidad = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let unidad = '';
    const categoria = '';
    let position = TableTop + 15;
    for (let i = 0; i < info.length; i++) {
      const item = info[i];
      if (unidad == '' || unidad != item.unidad) {
        doc.font('Helvetica-Bold');
        doc.fillColor('blue');
        this.generateTableRowCat(
          doc,
          position,
          item.unidad,
          '',
          '',
          '',
          '',
          '',
          '',
        );
        doc.font('Helvetica');
        doc.fillColor('#444444');

        position = position + 15;
        unidad = item.unidad;
      } else {
        unidad = item.unidad;
      }
      this.generateTableRowCat(
        doc,
        position,
        item.categoria,
        item.total,
        item.promedioedad.toFixed(1),
        item.directos,
        item.indirectos,
        item.militares,
        item.mujeres,
      );
      totalUnidad.cont = totalUnidad.cont + 1;
      position = position + 15;
      totalCategoria.total = totalCategoria.total + item.total;
      totalCategoria.cont = totalCategoria.cont + 1;
      totalCategoria.edadPromedio =
        totalCategoria.edadPromedio + item.promedioedad;
      totalCategoria.directo = totalCategoria.directo + item.directos;
      totalCategoria.indirecto = totalCategoria.indirecto + item.indirectos;
      totalCategoria.militares = totalCategoria.militares + item.militares;
      totalCategoria.mujeres = totalCategoria.mujeres + item.mujeres;

      if (i + 1 <= info.length - 1) {
        if (categoria != info[i + 1].categoria) {
          totalUnidad.total = totalUnidad.total + totalCategoria.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalCategoria.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalCategoria.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalCategoria.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
          totalCategoria = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
        }
        if (unidad != info[i + 1].unidad) {
          totalUnidad.total = totalUnidad.total + totalCategoria.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalCategoria.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalCategoria.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalCategoria.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
          this.generateTableRow(
            doc,
            position,
            'TOTAL Unidad:',
            totalUnidad.total,
            (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
            totalUnidad.directo,
            totalUnidad.indirecto,
            totalUnidad.militares,
            totalUnidad.mujeres,
          );
          totalUnidad = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
          position = position + 15;
        }
      } else {
        totalUnidad.total = totalUnidad.total + totalCategoria.total;
        totalUnidad.edadPromedio =
          totalUnidad.edadPromedio + totalCategoria.edadPromedio;
        totalUnidad.directo = totalUnidad.directo + totalCategoria.directo;
        totalUnidad.indirecto =
          totalUnidad.indirecto + totalCategoria.indirecto;
        totalUnidad.militares =
          totalUnidad.militares + totalCategoria.militares;
        totalUnidad.mujeres = totalUnidad.mujeres + totalCategoria.mujeres;
        totalCategoria = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        this.generateTableRowCat(
          doc,
          position,
          'TOTAL Unidad:',
          totalUnidad.total,
          (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
          totalUnidad.directo,
          totalUnidad.indirecto,
          totalUnidad.militares,
          totalUnidad.mujeres,
        );
        totalUnidad = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        position = position + 15;
      }
    }
  }

  // create(createReporteDto: CreateReporteDto) {
  //   return 'This action adds a new reporte';
  // }
  //
  // findAll() {
  //   return `This action returns all reportes`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} reporte`;
  // }
  //
  // update(id: number, updateReporteDto: UpdateReporteDto) {
  //   return `This action updates a #${id} reporte`;
  // }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
// gui
  async generatePDFreporteFuerzaLaboralCont(cont: any): Promise<Buffer> {
    const rep = cont;
    console.log(cont);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      this.generateHeader(doc, 'Fuerza Laboral Por Tipo de Contrato');
      doc.moveDown();
      this.generateTableCont(doc, rep);
      // this.generateFooter(doc);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  generateTableRowCont(
    doc,
    y,
    uniCont,
    total,
    edadP,
    directo,
    indirecto,
    militares,
    mujeres,
  ) {
    doc
      .fontSize(8)
      .text(uniCont, 30, y)
      .text(total, 250, y)
      .text(edadP, 280, y)
      .text(directo, 350, y)
      .text(indirecto, 400, y)
      .text(militares, 450, y)
      .text(mujeres, 505, y);
  }

  generateTableCont(doc, info) {
    const TableTop = 115;
    doc.font('Helvetica-Bold');
    this.generateTableRowCat(
      doc,
      TableTop,
      'Unidades/Tipo de Contrato',
      'TOTAL',
      'Edad Promedio',
      'Directo',
      'Indirecto',
      'Militares',
      'Mujeres',
    );
    this.generateHr(doc, TableTop + 10);
    doc.font('Helvetica');

    let totalContrato = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let totalUnidad = {
      total: 0,
      cont: 0,
      edadPromedio: 0,
      directo: 0,
      indirecto: 0,
      militares: 0,
      mujeres: 0,
    };
    let unidad = '';
    const tipoContrato = '';
    let position = TableTop + 15;
    for (let i = 0; i < info.length; i++) {
      const item = info[i];
      if (unidad == '' || unidad != item.unidad) {
        doc.font('Helvetica-Bold');
        doc.fillColor('blue');
        this.generateTableRowCont(
          doc,
          position,
          item.unidad,
          '',
          '',
          '',
          '',
          '',
          '',
        );
        doc.font('Helvetica');
        doc.fillColor('#444444');

        position = position + 15;
        unidad = item.unidad;
      } else {
        unidad = item.unidad;
      }
      this.generateTableRowCont(
        doc,
        position,
        item.tipocontrato,
        item.total,
        item.promedioedad.toFixed(1),
        item.directos,
        item.indirectos,
        item.militares,
        item.mujeres,
      );
      totalUnidad.cont = totalUnidad.cont + 1;
      position = position + 15;
      totalContrato.total = totalContrato.total + item.total;
      totalContrato.cont = totalContrato.cont + 1;
      totalContrato.edadPromedio =
        totalContrato.edadPromedio + item.promedioedad;
      totalContrato.directo = totalContrato.directo + item.directos;
      totalContrato.indirecto = totalContrato.indirecto + item.indirectos;
      totalContrato.militares = totalContrato.militares + item.militares;
      totalContrato.mujeres = totalContrato.mujeres + item.mujeres;

      if (i + 1 <= info.length - 1) {
        if (tipoContrato != info[i + 1].tipoContrato) {
          totalUnidad.total = totalUnidad.total + totalContrato.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalContrato.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalContrato.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalContrato.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalContrato.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalContrato.mujeres;
          totalContrato = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
        }
        if (unidad != info[i + 1].unidad) {
          totalUnidad.total = totalUnidad.total + totalContrato.total;
          totalUnidad.edadPromedio =
            totalUnidad.edadPromedio + totalContrato.edadPromedio;
          totalUnidad.directo = totalUnidad.directo + totalContrato.directo;
          totalUnidad.indirecto =
            totalUnidad.indirecto + totalContrato.indirecto;
          totalUnidad.militares =
            totalUnidad.militares + totalContrato.militares;
          totalUnidad.mujeres = totalUnidad.mujeres + totalContrato.mujeres;
          this.generateTableRowCont(
            doc,
            position,
            'TOTAL Unidad:',
            totalUnidad.total,
            (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
            totalUnidad.directo,
            totalUnidad.indirecto,
            totalUnidad.militares,
            totalUnidad.mujeres,
          );
          totalUnidad = {
            total: 0,
            cont: 0,
            edadPromedio: 0,
            directo: 0,
            indirecto: 0,
            militares: 0,
            mujeres: 0,
          };
          position = position + 15;
        }
      } else {
        totalUnidad.total = totalUnidad.total + totalContrato.total;
        totalUnidad.edadPromedio =
          totalUnidad.edadPromedio + totalContrato.edadPromedio;
        totalUnidad.directo = totalUnidad.directo + totalContrato.directo;
        totalUnidad.indirecto = totalUnidad.indirecto + totalContrato.indirecto;
        totalUnidad.militares = totalUnidad.militares + totalContrato.militares;
        totalUnidad.mujeres = totalUnidad.mujeres + totalContrato.mujeres;
        totalContrato = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        this.generateTableRowCont(
          doc,
          position,
          'TOTAL Unidad:',
          totalUnidad.total,
          (totalUnidad.edadPromedio / totalUnidad.cont).toFixed(1),
          totalUnidad.directo,
          totalUnidad.indirecto,
          totalUnidad.militares,
          totalUnidad.mujeres,
        );
        totalUnidad = {
          total: 0,
          cont: 0,
          edadPromedio: 0,
          directo: 0,
          indirecto: 0,
          militares: 0,
          mujeres: 0,
        };
        position = position + 15;
      }
    }
  }
}
