import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralParametersModule } from './general-parameters/general-parameters.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { GeneralParametersController } from './general-parameters/general-parameters.controller';
import { ProjectController } from './projects/projects.controller';
import { ProjectModule } from './projects/projects.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ListagemProjetosModule } from './listagem-projetos/listagem-projetos.module';
import { FeedHighlightsModule } from './feed-highlights/feed-highlights.module';
import { memoryStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GeneralParametersModule,
    PrismaModule,
    ProjectModule,
    UserModule,
    ListagemProjetosModule,
    FeedHighlightsModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/public',
    }),
  ],
  controllers: [
    AppController,
    GeneralParametersController,
    ProjectController,
    UserController,
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
