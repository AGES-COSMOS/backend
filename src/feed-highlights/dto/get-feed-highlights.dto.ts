import { ApiProperty } from '@nestjs/swagger';
import { EventDto } from './event.dto';
import { ProjectDto } from './project.dto';

export class GetFeedHighlightsDto {
  @ApiProperty({ type: [EventDto] })
  events: EventDto[];

  @ApiProperty({ type: [ProjectDto] })
  projects: ProjectDto[];
}
