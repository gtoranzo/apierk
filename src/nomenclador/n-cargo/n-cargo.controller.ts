import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NCargoService } from './n-cargo.service';
import { CreateNCargoDto } from './dto/create-n-cargo.dto';
import { UpdateNCargoDto } from './dto/update-n-cargo.dto';

@Controller('n-cargo')
export class NCargoController {
  constructor(private readonly nCargoService: NCargoService) {}

  @Post()
  create(@Body() createNCargoDto: CreateNCargoDto) {
    return this.nCargoService.create(createNCargoDto);
  }

  @Get()
  findAll() {
    return this.nCargoService.selectAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nCargoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNCargoDto: UpdateNCargoDto) {
    return this.nCargoService.update(+id, updateNCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nCargoService.remove(+id);
  }
}
