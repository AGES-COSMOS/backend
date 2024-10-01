import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  controllers: [KeywordController],
  imports: [PrismaModule],
  providers: [KeywordService],
})
export class KeywordModule {}
