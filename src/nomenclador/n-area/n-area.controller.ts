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
import { NAreaService } from './n-area.service';
import { CreateNAreaDto } from './dto/create-n-area.dto';
import { UpdateNAreaDto } from './dto/update-n-area.dto';

@Controller('n-area')
export class NAreaController {
  constructor(private readonly nAreaService: NAreaService) {}

  @Post()
  create(@Body() createNAreaDto: CreateNAreaDto) {
    return this.nAreaService.create(createNAreaDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.nAreaService.findAll(pagination);
  }

  @Get()
  selectAll() {
    return this.nAreaService.selectAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nAreaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNAreaDto: UpdateNAreaDto) {
    return this.nAreaService.update(id, updateNAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nAreaService.remove(id);
  }
}
