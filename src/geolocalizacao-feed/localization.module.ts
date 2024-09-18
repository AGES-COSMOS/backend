import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';

@Module({
  imports: [],
  controllers: [LocalizationController],
  providers: [LocalizationService, PrismaService],
})
export class LocalizationModule {}
