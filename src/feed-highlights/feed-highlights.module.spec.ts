import { Test, TestingModule } from '@nestjs/testing';
import { FeedHighlightsModule } from './feed-highlights.module';
import { FeedHighlightsService } from './feed-highlights.service';
import { FeedHighlightsController } from './feed-highlights.controller';
import { PrismaService } from '../prisma.service';

describe('FeedHighlightsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [FeedHighlightsModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide the FeedHighlightsService', () => {
    const service = module.get<FeedHighlightsService>(FeedHighlightsService);
    expect(service).toBeDefined();
  });

  it('should provide the FeedHighlightsController', () => {
    const controller = module.get<FeedHighlightsController>(
      FeedHighlightsController,
    );
    expect(controller).toBeDefined();
  });

  it('should provide the PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeDefined();
  });
});
