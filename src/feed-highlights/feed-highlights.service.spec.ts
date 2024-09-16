import { Test, TestingModule } from '@nestjs/testing';
import { FeedHighlightsService } from './feed-highlights.service';
import { PrismaService } from '../prisma.service';

describe('FeedHighlightsService', () => {
  let service: FeedHighlightsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedHighlightsService,
        {
          provide: PrismaService,
          useValue: {
            event: {
              findMany: jest.fn(),
            },
            project: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FeedHighlightsService>(FeedHighlightsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return events and projects updated within the last 7 days', async () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Event 1',
        imageURL: 'http://example.com/image1.jpg',
        description: 'Description 1',
        date: new Date(),
        hour: new Date(),
        IsOnline: true,
        address: 'Address 1',
        latitude: 1.234,
        longitude: 5.678,
        institution_id: 1,
        project_id: 1,
        updatedAt: new Date(),
        updatedBy: 'User 1',
      },
    ];
    const mockProjects = [
      {
        id: 1,
        name: 'Project 1',
        imageURL: 'http://example.com/image1.jpg',
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
    ];

    (prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents);
    (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

    const result = await service.getFeedHighlights(1, 10);

    expect(prisma.event.findMany).toHaveBeenCalledWith({
      where: { updatedAt: { gte: expect.any(Date) } },
      skip: 0,
      take: 10,
    });
    expect(prisma.project.findMany).toHaveBeenCalledWith({
      where: { updatedAt: { gte: expect.any(Date) } },
      skip: 0,
      take: 10,
    });

    expect(result).toEqual({ events: mockEvents, projects: mockProjects });
  });

  it('should handle empty results', async () => {
    (prisma.event.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.project.findMany as jest.Mock).mockResolvedValue([]);

    const result = await service.getFeedHighlights(1, 10);

    expect(result).toEqual({ events: [], projects: [] });
  });
});
