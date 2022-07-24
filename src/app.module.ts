import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PersonaModule } from './config/persona/persona.module';
import { GrupoEscalaModule } from './config/grupo-escala/grupo-escala.module';
import { CargoOcupaModule } from './config/cargo-ocupa/cargo-ocupa.module';
import { CategoriaModule } from './config/categoria/categoria.module';
import { MotBajaModule } from './config/mot-baja/mot-baja.module';
import { DesBajaModule } from './config/des-baja/des-baja.module';
import { CargoMilitarModule } from './config/cargo-militar/cargo-militar.module';
import { GradoMilitarModule } from './config/grado-militar/grado-militar.module';
import { PuestosTrabajoVacantesModule } from './reportes/puestos-trabajo-vacantes/puestos-trabajo-vacantes.module';
import { FormaPagoModule } from './forma-pago/forma-pago.module';
import { NAreaModule } from './nomenclador/n-area/n-area.module';
import { NUnidadModule } from './nomenclador/n-unidad/n-unidad.module';
import { NCargoModule } from './nomenclador/n-cargo/n-cargo.module';
import { VacantesPlantillaModule } from './reportes/vacantes-plantilla/vacantes-plantilla.module';

@Module({
  imports: [
    PrismaModule,
    CargoOcupaModule,
    CategoriaModule,
    MotBajaModule,
    DesBajaModule,
    CargoMilitarModule,
    GradoMilitarModule,
    PersonaModule,
    GrupoEscalaModule,
    PuestosTrabajoVacantesModule,
    FormaPagoModule,
    NAreaModule,
    NUnidadModule,
    NCargoModule,
    VacantesPlantillaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService /*FileService*/],
})
export class AppModule {}
