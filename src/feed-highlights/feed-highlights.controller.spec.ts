import { Test, TestingModule } from '@nestjs/testing';
import { FeedHighlightsController } from './feed-highlights.controller';
import { FeedHighlightsService } from './feed-highlights.service';
import { Decimal } from '@prisma/client/runtime/library';

describe('FeedHighlightsController', () => {
  let controller: FeedHighlightsController;
  let service: FeedHighlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedHighlightsController],
      providers: [
        {
          provide: FeedHighlightsService,
          useValue: {
            getFeedHighlights: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedHighlightsController>(FeedHighlightsController);
    service = module.get<FeedHighlightsService>(FeedHighlightsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return feed highlights', async () => {
    const mockResponse = {
      events: [
        {
          id: 1,
          title: 'Event 1',
          imageURL: 'http://example.com/image1.jpg',
          description: 'Description 1',
          date: new Date(),
          hour: new Date(),
          IsOnline: true,
          address: 'Address 1',
          latitude: new Decimal(1.234),
          longitude: new Decimal(5.678),
          institution_id: 1,
          project_id: 1,
          updatedAt: new Date(),
          updatedBy: 'User 1',
        },
      ],
      projects: [
        {
          id: 1,
          name: 'Project 1',
          history: 'History 1',
          purpose: 'Purpose 1',
          contact: 'Contact 1',
          start_date: new Date(),
          end_date: new Date(),
          status: 'Status 1',
          teacher_id: 1,
          institution_id: 1,
          updatedAt: new Date(),
          updatedBy: 'User 1',
        },
      ],
    };

    jest.spyOn(service, 'getFeedHighlights').mockResolvedValue(mockResponse);

    const result = await controller.getFeedHighlights(1, 10);

    expect(service.getFeedHighlights).toHaveBeenCalledWith(1, 10);

    expect(result).toEqual(mockResponse);
  });

  it('should handle pagination correctly', async () => {
    jest.spyOn(service, 'getFeedHighlights').mockResolvedValue({
      events: [],
      projects: [],
    });

    await controller.getFeedHighlights(2, 5);
    expect(service.getFeedHighlights).toHaveBeenCalledWith(2, 5);
  });
});
