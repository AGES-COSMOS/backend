import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GeneralParametersService {
  constructor(private prisma: PrismaService) {}

  async getAboutUs() {
    return this.prisma.generalParameters.findUnique({ where: { id: 1 } });
  }

  async updateGeneralParameters(content: string) {
    const existingRecord = await this.prisma.generalParameters.findFirst();
    if (existingRecord) {
      return this.prisma.generalParameters.update({
        where: { id: existingRecord.id },
        data: { content },
      });
    } else {
      return this.prisma.generalParameters.create({
        data: { 
          content,
          instagramURL: '',   // Adicione um valor padrão ou predefinido aqui
          youtubeURL: '',     // Adicione um valor padrão ou predefinido aqui
          linkedinURL: '',    // Adicione um valor padrão ou predefinido aqui
          updatedBy: 'system' // Adicione um valor padrão ou predefinido aqui
        },
      });
    }
  }
}
