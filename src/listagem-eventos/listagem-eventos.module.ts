import { Module } from '@nestjs/common';
import { ListagemEventosController } from './listagem-eventos.controller';
import { ListagemEventosService } from './listagem-eventos.service';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [ListagemEventosController],
  providers: [ListagemEventosService],
  imports: [PrismaModule],
})
export class ListagemEventosModule {}
