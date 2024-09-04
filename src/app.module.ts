import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutUsModule } from './general-parameters/general-parameters.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { GeneralParametersController } from './general-parameters/general-parameters.controller';
import { FeedHighlightsModule } from './feed-highlights/feed-highlights.module';

@Module({
  imports: [AboutUsModule, PrismaModule, FeedHighlightsModule],
  controllers: [AppController, GeneralParametersController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
