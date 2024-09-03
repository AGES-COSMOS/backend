import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutUsModule } from './about-us/about-us.module';
import { ProjectModule } from './projects/projects.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { AboutUsController } from './about-us/about-us.controller';
import { ProjectController } from './projects/projects.controller';

@Module({
  imports: [AboutUsModule, PrismaModule, ProjectModule],
  controllers: [AppController, AboutUsController, ProjectController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
