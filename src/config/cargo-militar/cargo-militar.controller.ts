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
import { CargoMilitarService } from './cargo-militar.service';
import { CreateCargoMilitarDto } from './dto/create-cargo-militar.dto';
import { UpdateCargoMilitarDto } from './dto/update-cargo-militar.dto';

@Controller('cargo-militar')
export class CargoMilitarController {
  constructor(private readonly cargoMilitarService: CargoMilitarService) {}

  @Post()
  create(@Body() createCargoMilitarDto: CreateCargoMilitarDto) {
    return this.cargoMilitarService.create(createCargoMilitarDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.cargoMilitarService.findAll(pagination);
  }
  // @Get()
  // findAll() {
  //   return this.cargoMilitarService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoMilitarService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCargoMilitarDto: UpdateCargoMilitarDto,
  ) {
    return this.cargoMilitarService.update(id, updateCargoMilitarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoMilitarService.remove(id);
  }
}
