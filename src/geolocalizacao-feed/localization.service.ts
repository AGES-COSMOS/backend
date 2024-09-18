import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { getDistance } from 'geolib';

@Injectable()
export class LocalizationService {
  constructor(private prisma: PrismaService) {}

  async getLocation(userLatitude: number, userLongitude: number) {
    const distance = getDistance(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: 0.0, longitude: 0.0 },
    );
    return distance;
  }

  async getNearbyProjects(userLatitude: number, userLongitude: number) {
    const maxDistanceInMeters = 10000; // 10km - radius
    const projects = await this.prisma.project.findMany();

    const nearbyProjects = await Promise.all(
      projects.map(async (project) => {
        const institution = await this.prisma.institution.findUnique({
          where: { id: project.institution_id },
        });
        const institutionLatitude = parseFloat(institution.latitude.toString());
        const institutionLongitude = parseFloat(
          institution.longitude.toString(),
        );

        const distance = getDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: institutionLatitude, longitude: institutionLongitude },
        );

        return distance <= maxDistanceInMeters ? project : null;
      }),
    );

    return nearbyProjects.filter((project) => project !== null);
  }

  async getNearbyEvents(userLatitude: number, userLongitude: number) {
    const maxDistanceInMeters = 10000; // 10km - radius
    const events = await this.prisma.event.findMany();

    const nearbyEvents = await Promise.all(
      events.map(async (event) => {
        const eventLatitude = parseFloat(event.latitude.toString());
        const eventLongitude = parseFloat(event.longitude.toString());

        const distance = getDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: eventLatitude, longitude: eventLongitude },
        );

        return distance <= maxDistanceInMeters ? event : null;
      }),
    );

    return nearbyEvents.filter((event) => event !== null);
  }
}
