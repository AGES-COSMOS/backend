import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInstitutionDto } from './create-institution.dto';
import { UpdateInstitutionDto } from './update-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}
  async createInstitution(createInstitutionDto: CreateInstitutionDto) {
    return this.prisma.institution.create({ data: { ...createInstitutionDto } });
  }
  async getInstitution(id: number) {
    return this.prisma.institution.findUnique({ where: { id: id } });
  }
  async updateInstitution(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    const institution = await this.prisma.institution.findUnique({ where: { id } });
    if (!institution) {
      throw new NotFoundException(`Institution with id ${id} not found`);
  }
    return this.prisma.institution.update({
      where: { id },
      data: { ...updateInstitutionDto },
    });
  }
  async deleteInstitution(id: number) {
    const institution = await this.prisma.institution.findUnique({ where: { id } });
    if (!institution) {
      throw new NotFoundException(`Institution with id ${id} not found`);
  }
    return this.prisma.institution.delete({ where: { id } });
  }
  async getAllInstitutions() {
    return this.prisma.institution.findMany();
  }
}
