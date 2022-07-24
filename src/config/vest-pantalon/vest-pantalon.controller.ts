import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VestPantalonService } from './vest-pantalon.service';
import { CreateVestPantalonDto } from './dto/create-vest-pantalon.dto';
import { UpdateVestPantalonDto } from './dto/update-vest-pantalon.dto';

@Controller('vest-pantalon')
export class VestPantalonController {
  constructor(private readonly vestPantalonService: VestPantalonService) {}

  @Post()
  create(@Body() createVestPantalonDto: CreateVestPantalonDto) {
    return this.vestPantalonService.create(createVestPantalonDto);
  }

  @Get()
  findAll() {
    return this.vestPantalonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vestPantalonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVestPantalonDto: UpdateVestPantalonDto) {
    return this.vestPantalonService.update(id, updateVestPantalonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vestPantalonService.remove(id);
  }
}
