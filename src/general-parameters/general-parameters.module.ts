import { Module } from '@nestjs/common';
import { GeneralParametersController } from './general-parameters.controller';
import { GeneralParametersService } from './general-parameters.service';
import { PrismaModule } from '../prisma.module';

@Module({
  providers: [GeneralParametersService, GeneralParametersController],
  imports: [PrismaModule],
  exports: [GeneralParametersService],
})
export class AboutUsModule {}
