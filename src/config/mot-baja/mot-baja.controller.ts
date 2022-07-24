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
import { MotBajaService } from './mot-baja.service';
import { CreateMotBajaDto } from './dto/create-mot-baja.dto';
import { UpdateMotBajaDto } from './dto/update-mot-baja.dto';

@Controller('mot-baja')
export class MotBajaController {
  constructor(private readonly motBajaService: MotBajaService) {}

  @Post()
  create(@Body() createMotBajaDto: CreateMotBajaDto) {
    return this.motBajaService.create(createMotBajaDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.motBajaService.findAll(pagination);
  }
  // @Get()
  // findAll() {
  //   return this.motBajaService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motBajaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotBajaDto: UpdateMotBajaDto) {
    return this.motBajaService.update(id, updateMotBajaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motBajaService.remove(id);
  }
}
