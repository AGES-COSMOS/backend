import { Controller, Get } from '@nestjs/common';
import { ListagemEventosService } from './listagem-eventos.service';

@Controller('listagem-eventos')
export class ListagemEventosController {
  constructor(private readonly listagemEventosService: ListagemEventosService) {}

  @Get()
  async getEvents() {
    return await this.listagemEventosService.getEvents();
  }
}
