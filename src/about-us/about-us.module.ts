// src/about-us/about-us.module.ts
import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AboutUsController],
  providers: [AboutUsService, PrismaService],
})
export class AboutUsModule {}
