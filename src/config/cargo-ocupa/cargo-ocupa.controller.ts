import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CargoOcupaService } from './cargo-ocupa.service';
import { CreateCargoOcupaDto } from './dto/create-cargo-ocupa.dto';
import { UpdateCargoOcupaDto } from './dto/update-cargo-ocupa.dto';

@Controller('cargo-ocupa')
export class CargoOcupaController {
  constructor(private readonly cargoOcupaService: CargoOcupaService) {}

  @Post()
  create(@Body() createCargoOcupaDto: CreateCargoOcupaDto) {
    return this.cargoOcupaService.create(createCargoOcupaDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.cargoOcupaService.findAll(pagination);
  }
  // @Get()
  // findAll() {
  //   return this.cargoOcupaService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoOcupaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCargoOcupaDto: UpdateCargoOcupaDto,
  ) {
    return this.cargoOcupaService.update(id, updateCargoOcupaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoOcupaService.remove(id);
  }
}
