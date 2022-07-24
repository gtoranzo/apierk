import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VestZapatoService } from './vest-zapato.service';
import { CreateVestZapatoDto } from './dto/create-vest-zapato.dto';
import { UpdateVestZapatoDto } from './dto/update-vest-zapato.dto';

@Controller('vest-zapato')
export class VestZapatoController {
  constructor(private readonly vestZapatoService: VestZapatoService) {}

  @Post()
  create(@Body() createVestZapatoDto: CreateVestZapatoDto) {
    return this.vestZapatoService.create(createVestZapatoDto);
  }

  @Get()
  findAll() {
    return this.vestZapatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vestZapatoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVestZapatoDto: UpdateVestZapatoDto,
  ) {
    return this.vestZapatoService.update(id, updateVestZapatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vestZapatoService.remove(id);
  }

  // @Get('/pdf')
  // async generatePDF(@Res() res: Response) {
  //   const buffer = await this.vestZapatoService.generatePDF();
  // res.set({
  //   'Content-Type': 'application/pdf',
  //   'Content-Disposition': 'attachment; filename=example.pdf',
  //   'Content-Length': buffer.length,
  // });
  //
  // res.end(buffer);
  // return this.vestZapatoService.findAll();
  // }
}
