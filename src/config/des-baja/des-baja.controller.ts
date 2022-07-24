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
import { DesBajaService } from './des-baja.service';
import { CreateDesBajaDto } from './dto/create-des-baja.dto';
import { UpdateDesBajaDto } from './dto/update-des-baja.dto';

@Controller('des-baja')
export class DesBajaController {
  constructor(private readonly desBajaService: DesBajaService) {}

  @Post()
  create(@Body() createDesBajaDto: CreateDesBajaDto) {
    return this.desBajaService.create(createDesBajaDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.desBajaService.findAll(pagination);
  }
  // @Get()
  // findAll() {
  //   return this.desBajaService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desBajaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesBajaDto: UpdateDesBajaDto) {
    return this.desBajaService.update(id, updateDesBajaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desBajaService.remove(id);
  }
}
