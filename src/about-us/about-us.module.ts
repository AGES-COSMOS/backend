import { Module } from '@nestjs/common';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';
import { PrismaModule } from '../prisma.module';

@Module({
  providers: [AboutUsService, AboutUsController],
  imports: [PrismaModule],
  exports: [AboutUsService],
})
export class AboutUsModule {}
