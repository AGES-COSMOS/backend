import { Module } from '@nestjs/common';
import { ListagemProjetosController } from './listagem-projetos.controller';
import { ListagemProjetosService } from './listagem-projetos.service';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [ListagemProjetosController],
  providers: [ListagemProjetosService],
  imports: [PrismaModule],
})
export class ListagemProjetosModule {}
