import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutUsModule } from './about-us/about-us.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { AboutUsController } from './about-us/about-us.controller';

@Module({
  imports: [AboutUsModule, PrismaModule],
  controllers: [AppController, AboutUsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
