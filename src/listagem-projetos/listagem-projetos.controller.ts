import { Controller, Get } from '@nestjs/common';
import { ListagemProjetosService } from './listagem-projetos.service';

@Controller('listagem-projetos')
export class ListagemProjetosController {
  constructor(private readonly listagemProjetosService: ListagemProjetosService) {}

  @Get()
  async getProjects() {
    return await this.listagemProjetosService.getProjects();
  }
}
