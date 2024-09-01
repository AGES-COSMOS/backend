import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AboutUsService {
  constructor(private prisma: PrismaService) {}

  async getAboutUs() {
    return this.prisma.aboutUs.findUnique({ where: { id: 1 } });
  }

  async updateAboutUs(content: string) {
    const existingRecord = await this.prisma.aboutUs.findFirst();
    if (existingRecord) {
      return this.prisma.aboutUs.update({
        where: { id: existingRecord.id },
        data: { content },
      });
    } else {
      return this.prisma.aboutUs.create({
        data: { content },
      });
    }
  }
}
