import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VestCamisaService } from './vest-camisa.service';
import { CreateVestCamisaDto } from './dto/create-vest-camisa.dto';
import { UpdateVestCamisaDto } from './dto/update-vest-camisa.dto';

@Controller('vest-camisa')
export class VestCamisaController {
  constructor(private readonly vestCamisaService: VestCamisaService) {}

  @Post()
  create(@Body() createVestCamisaDto: CreateVestCamisaDto) {
    return this.vestCamisaService.create(createVestCamisaDto);
  }

  @Get()
  findAll() {
    return this.vestCamisaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vestCamisaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVestCamisaDto: UpdateVestCamisaDto,
  ) {
    return this.vestCamisaService.update(id, updateVestCamisaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vestCamisaService.remove(id);
  }
}
