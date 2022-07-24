import { Injectable } from '@nestjs/common';
import { CreatePuestosTrabajoVacanteDto } from './dto/create-puestos-trabajo-vacante.dto';
import { UpdatePuestosTrabajoVacanteDto } from './dto/update-puestos-trabajo-vacante.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PuestosTrabajoVacantesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPuestosTrabajoVacanteDto: CreatePuestosTrabajoVacanteDto) {
    return 'This action adds a new puestosTrabajoVacante';
  }

  async findAll() {
    const plantilla = 'No';

    const result = await this.prisma.$queryRaw(
      'SELECT dat_unidad.nombre as unidad, dat_area.nombre as area, nom_cargo.nombre as cargo, ' +
        'nom_categocup.nombre as nombre_categocup, nom_categocup.codigo, nom_grupoescala.nombre as nombre_grupoescala, nom_grupoescala.salario, nom_cargo.calificador ' +
        'FROM mod_rechum.dat_puesto INNER JOIN mod_rechum.dat_area ON dat_puesto.id_area like dat_area.id_area INNER JOIN mod_rechum.nom_cargo ON dat_puesto.id_cargo like nom_cargo.id_cargo ' +
        'INNER JOIN mod_rechum.dat_unidad ON dat_area.id_unidad like dat_unidad.id_unidad INNER JOIN mod_rechum.nom_categocup ON nom_cargo.id_categ_ocup like nom_categocup.id_categ_ocup ' +
        'INNER JOIN mod_rechum.nom_grupoescala ON nom_cargo.id_grupo_escala like nom_grupoescala.id_grupo_escala WHERE (dat_puesto.plantilla = $1);',
      plantilla,
    );
    console.log(result);
    return result;
  }

  // async getInfoReporteUnidad() {
  //   return await this.prisma.$queryRaw(
  //     `SELECT vpuesto.nombunidad AS unidad, vpuesto.idcategocup AS idCateg, vpuesto.categocup AS categoria, dp.idtipocontrato AS idtipocont, ntc.nombre AS tipoContrato, count(vpuesto.ocupado) AS total, AVG(EXTRACT(YEAR FROM (Age(dp.fechanac)))) AS promedioEdad, count(case when sexo='M' then 1 end) as hombres, count(case when sexo='F' then 1 end) as mujeres, count(case when directo='Sí' then 1 end) as directos, count(case when directo='No' then 1 end) as indirectos, count(case when idregistromilitar!=null then 1 end) as militares FROM mod_rechum.v_puesto vpuesto inner join mod_rechum.dat_persona dp ON vpuesto.idpersona like dp.idpersona inner join mod_rechum.nom_tipocontrato ntc ON ntc.idtipocontrato like dp.idtipocontrato group by vpuesto.nombunidad, dp.idtipocontrato, vpuesto.idcategocup, vpuesto.categocup, ntc.nombre`,
  //   );
  // }
  //
  // async getInfoReporteCategoria() {
  //   return await this.prisma.$queryRaw(
  //     `SELECT vpuesto.nombunidad AS unidad, vpuesto.idcategocup AS idCateg, vpuesto.categocup AS categoria, count(vpuesto.ocupado) AS total, AVG(EXTRACT(YEAR FROM (Age(dp.fechanac)))) AS promedioEdad, count(case when sexo='M' then 1 end) as hombres, count(case when sexo='F' then 1 end) as mujeres, count(case when directo='Sí' then 1 end) as directos, count(case when directo='No' then 1 end) as indirectos, count(case when idregistromilitar!=null then 1 end) as militares FROM mod_rechum.v_puesto vpuesto inner join mod_rechum.dat_persona dp ON vpuesto.idpersona like dp.idpersona group by vpuesto.nombunidad, vpuesto.idcategocup, vpuesto.categocup`,
  //   );
  // }
  // `SELECT vpuesto.nombunidad AS unidad, vpuesto.idcategocup AS idCateg, vpuesto.categocup AS categoria, dp.idtipocontrato AS idtipocont, ntc.nombre AS tipoContrato, count(vpuesto.ocupado) AS total, AVG(EXTRACT(YEAR FROM (Age(dp.fechanac)))) AS promedioEdad, count(case when sexo='M' then 1 end) as hombres, count(case when sexo='F' then 1 end) as mujeres, count(case when directo='Sí' then 1 end) as directos, count(case when directo='No' then 1 end) as indirectos, count(case when idregistromilitar!=null then 1 end) as militares FROM mod_rechum.v_puesto vpuesto inner join mod_rechum.dat_persona dp ON vpuesto.idpersona like dp.idpersona inner join mod_rechum.nom_tipocontrato ntc ON ntc.idtipocontrato like dp.idtipocontrato group by vpuesto.nombunidad, dp.idtipocontrato, vpuesto.idcategocup, vpuesto.categocup, ntc.nombre`,
  // `SELECT vpuesto.nombunidad AS unidad, vpuesto.idcategocup AS idCateg, vpuesto.categocup AS categoria, count(vpuesto.ocupado) AS total, AVG(EXTRACT(YEAR FROM (Age(dp.fechanac)))) AS promedioEdad, count(case when sexo='M' then 1 end) as hombres, count(case when sexo='F' then 1 end) as mujeres, count(case when directo='Sí' then 1 end) as directos, count(case when directo='No' then 1 end) as indirectos, count(case when idregistromilitar!=null then 1 end) as militares FROM mod_rechum.v_puesto vpuesto inner join mod_rechum.dat_persona dp ON vpuesto.idpersona like dp.idpersona group by vpuesto.nombunidad, vpuesto.idcategocup, vpuesto.categocup`,
  //`SELECT vpuesto.nombunidad AS unidad, dp.idtipocontrato AS idtipocont, ntc.nombre AS tipoContrato, count(vpuesto.ocupado) AS total, AVG(EXTRACT(YEAR FROM (Age(dp.fechanac)))) AS promedioEdad, count(case when sexo='M' then 1 end) as hombres, count(case when sexo='F' then 1 end) as mujeres, count(case when directo='Sí' then 1 end) as directos, count(case when directo='No' then 1 end) as indirectos, count(case when idregistromilitar!=null then 1 end) as militares FROM mod_rechum.v_puesto vpuesto inner join mod_rechum.dat_persona dp ON vpuesto.idpersona like dp.idpersona inner join mod_rechum.nom_tipocontrato ntc ON ntc.idtipocontrato like dp.idtipocontrato group by vpuesto.nombunidad, dp.idtipocontrato, ntc.nombre`,

  findOne(id: string) {
    return `This action returns a #${id} puestosTrabajoVacante`;
  }

  update(
    id: string,
    updatePuestosTrabajoVacanteDto: UpdatePuestosTrabajoVacanteDto,
  ) {
    return `This action updates a #${id} puestosTrabajoVacante`;
  }

  remove(id: string) {
    return `This action removes a #${id} puestosTrabajoVacante`;
  }

  async generatePDFreporteVacantes(cont: any): Promise<Buffer> {
    const rep = cont;
    console.log(cont);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      // customize your PDF document
      this.generateHeader(doc, 'Puestos de Trabajo Vacantes');
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
    uniAreaCargo,
    nombre_categocup,
    codigo,
    nombre_grupoescala,
    salario,
    calificador,
  ) {
    doc
      .fontSize(8)
      .text(uniAreaCargo, 30, y)
      .text(nombre_categocup, 230, y)
      .text(codigo, 310, y)
      .text(nombre_grupoescala, 350, y)
      .text(salario, 420, y)
      .text(calificador, 490, y);
  }

  generateTable(doc, info) {
    const TableTop = 115;
    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      TableTop,
      'Unidad/Área/Cargo',
      'Cat. Ocupacional',
      'Código',
      'Grupo Escala',
      'Salario Escala',
      'Calificador',
    );
    this.generateHr(doc, TableTop + 10);
    doc.font('Helvetica');

    const totalArea = {
      cont: 0,
      nombre_categocup: 0,
      codigo: 0,
      nombre_grupoescala: 0,
      salario: 0,
      calificador: 0,
    };
    const totalUnidad = {
      cont: 0,
      nombre_categocup: 0,
      codigo: 0,
      nombre_grupoescala: 0,
      salario: 0,
      calificador: 0,
    };
    let unidad = '';
    let area = '';
    let position = TableTop + 15;
    for (let i = 0; i < info.length; i++) {
      const item = info[i];
      if (unidad == '' || unidad != item.unidad) {
        doc.font('Helvetica-Bold');
        doc.fillColor('blue');
        this.generateTableRow(doc, position, item.unidad, '', '', '', '', '');
        doc.font('Helvetica');
        doc.fillColor('#444444');

        position = position + 15;
        unidad = item.unidad;
      } else {
        unidad = item.unidad;
      }
      if (area == '' || area != item.area) {
        doc.font('Helvetica-Oblique');

        this.generateTableRow(doc, position, item.area, '', '', '', '', '');
        doc.font('Helvetica');
        position = position + 15;
        area = item.area;
      } else area = item.area;
      this.generateTableRow(
        doc,
        position,
        item.cargo,
        item.nombre_categocup,
        item.codigo,
        item.nombre_grupoescala,
        item.salario,
        item.calificador,
      );

      totalUnidad.cont = totalUnidad.cont + 1;
      position = position + 15;
      totalArea.cont = totalArea.cont + 1;
      totalArea.nombre_categocup =
        totalArea.nombre_categocup + item.nombre_categocupa;
      totalArea.codigo = totalArea.codigo + item.codigo;
      totalArea.nombre_grupoescala =
        totalArea.nombre_grupoescala + item.nombre_grupoescalas;
      totalArea.salario = totalArea.salario + item.salario;
      totalArea.calificador = totalArea.calificador + item.calificador;
      // revisar
      if (i + 1 <= info.length - 1) {
        if (area != info[i + 1].area) {
          totalUnidad.nombre_categocup =
            totalUnidad.nombre_categocup + totalArea.nombre_categocup;
          totalUnidad.codigo = totalUnidad.codigo + totalArea.codigo;
          totalUnidad.nombre_grupoescala =
            totalUnidad.nombre_grupoescala + totalArea.nombre_grupoescala;
          totalUnidad.salario = totalUnidad.salario + totalArea.salario;
          totalUnidad.calificador =
            totalUnidad.calificador + totalArea.calificador;
          this.generateTableRow(
            doc,
            position,
            'TOTAL Área:',
            totalArea.nombre_categocup,
            totalArea.codigo,
            totalArea.nombre_grupoescala,
            totalArea.salario,
            totalArea.calificador,
          );
          // totalArea = {
          //   cont: 0,
          //   nombre_categocup: 0,
          //   codigo: 0,
          //   nombre_grupoescala: 0,
          //   salario: 0,
          //   calificador: 0,
          // };
          position = position + 15;
        }
        if (unidad != info[i + 1].unidad) {
          totalUnidad.nombre_categocup =
            totalUnidad.nombre_categocup + totalArea.nombre_categocup;
          totalUnidad.codigo = totalUnidad.codigo + totalArea.codigo;
          totalUnidad.nombre_grupoescala =
            totalUnidad.nombre_grupoescala + totalArea.nombre_grupoescala;
          totalUnidad.salario = totalUnidad.salario + totalArea.salario;
          totalUnidad.calificador =
            totalUnidad.calificador + totalArea.calificador;
          this.generateTableRow(
            doc,
            position,
            'TOTAL Unidad:',
            totalUnidad.nombre_categocup,
            totalUnidad.codigo,
            totalUnidad.nombre_grupoescala,
            totalUnidad.salario,
            totalUnidad.calificador,
          );
          // totalUnidad = {
          //   total: 0,
          //   cont: 0,
          //   nombre_categocup: 0,
          //   codigo: 0,
          //   nombre_grupoescala: 0,
          //   salario: 0,
          //   calificador: 0,
          // };
          position = position + 15;
        }
      } else {
        totalUnidad.nombre_categocup =
          totalUnidad.nombre_categocup + totalArea.nombre_categocup;
        totalUnidad.codigo = totalUnidad.codigo + totalArea.codigo;
        totalUnidad.nombre_grupoescala =
          totalUnidad.nombre_grupoescala + totalArea.nombre_grupoescala;
        totalUnidad.salario = totalUnidad.salario + totalArea.salario;
        totalUnidad.calificador =
          totalUnidad.calificador + totalArea.calificador;
        this.generateTableRow(
          doc,
          position,
          'TOTAL Área:',
          totalArea.nombre_categocup,
          totalArea.codigo,
          totalArea.nombre_grupoescala,
          totalArea.salario,
          totalArea.calificador,
        );
        // totalArea = {
        //   total: 0,
        //   cont: 0,
        //   nombre_categocup: 0,
        //   codigo: 0,
        //   nombre_grupoescala: 0,
        //   salario: 0,
        //   calificador: 0,
        // };
        position = position + 15;
        this.generateTableRow(
          doc,
          position,
          'TOTAL Unidad:',
          totalUnidad.nombre_categocup,
          totalUnidad.codigo,
          totalUnidad.nombre_grupoescala,
          totalUnidad.salario,
          totalUnidad.calificador,
        );
        // totalUnidad = {
        //   total: 0,
        //   cont: 0,
        //   nombre_categocup: 0,
        //   codigo: 0,
        //   nombre_grupoescala: 0,
        //   salario: 0,
        //   calificador: 0,
        // };
        position = position + 15;
      }
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
}
