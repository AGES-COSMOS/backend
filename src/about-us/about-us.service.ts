import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AboutUsService {
  constructor(private prisma: PrismaService) {}

  private async validateAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { role: true },
    });

    if (user.role.title !== 'admin') {
      throw new ForbiddenException('Only admins can update this content');
    }
    return user;
  }

  async getAboutUs() {
    return this.prisma.generalParameters.findFirst();
  }

  async updateAboutUs(content: string, instagramURL: string, youtubeURL: string, linkedinURL: string, userId: string) {
    const user = await this.validateAdmin(userId);

    return this.prisma.generalParameters.update({
      where: { id: 1 },  // Assumindo que só há um registro de GeneralParameters
      data: {
        content,
        instagramURL,
        youtubeURL,
        linkedinURL,
        updatedBy: user.name,
      },
    });
  }
}
