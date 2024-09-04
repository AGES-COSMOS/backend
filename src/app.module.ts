import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralParametersModule } from './general-parameters/general-parameters.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { GeneralParametersController } from './general-parameters/general-parameters.controller';
import { ProjectController } from './projects/projects.controller';
import { ProjectModule } from './projects/projects.module';

@Module({
  imports: [GeneralParametersModule, PrismaModule, ProjectModule],
  controllers: [AppController, GeneralParametersController, ProjectController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
