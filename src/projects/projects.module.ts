import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { PrismaModule } from 'src/prisma.module';
import { KeywordModule } from './keyword/keyword.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, KeywordModule, CategoryModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
