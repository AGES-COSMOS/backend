import { Module } from '@nestjs/common';
import { FeedInteractionsService } from './feed-interactions.service';
import { FeedInteractionsController } from './feed-interactions.controller';
import { FeedInteractionsGateway } from './feed-interactions.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FeedInteractionsService, FeedInteractionsGateway, PrismaService],
  controllers: [FeedInteractionsController],
})
export class FeedInteractionsModule {}