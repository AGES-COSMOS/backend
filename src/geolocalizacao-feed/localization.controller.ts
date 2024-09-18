import { Controller, Get, Param } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Controller('localization')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}

  // Rota para obter a distância de uma localização ao ponto de referência (0,0)
  @Get('distance/:latitude/:longitude')
  async getDistance(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ) {
    const distance = await this.localizationService.getLocation(
      latitude,
      longitude,
    );
    return { distance };
  }

  // Rota para encontrar projetos próximos
  @Get('nearby-projects/:latitude/:longitude')
  async getNearbyProjects(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ) {
    const nearbyProjects = await this.localizationService.getNearbyProjects(
      latitude,
      longitude,
    );
    return nearbyProjects;
  }

  // Rota para encontrar eventos próximos
  @Get('nearby-events/:latitude/:longitude')
  async getNearbyEvents(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ) {
    const nearbyEvents = await this.localizationService.getNearbyEvents(
      latitude,
      longitude,
    );
    return nearbyEvents;
  }
}
