import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGeneralParametersDto } from './create-general-parameters.dto';

@Injectable()
export class GeneralParametersService {
  constructor(private prisma: PrismaService) {}

  async getParameter() {
    return this.prisma.generalParameters.findUnique({ where: { id: 1 } });
  }

  async findAll() {
    return this.prisma.generalParameters.findMany();
  }

  // Função para obter um parâmetro específico pelo ID
  async findOne(id: number) {
    return this.prisma.generalParameters.findUnique({
      where: { id },
    });
  }

  async findByParameter(parameter: string) {
    return this.prisma.generalParameters.findMany({
      where: {
        parameter: {
          equals: parameter,
        },
      },
    });
  }

  async findByParameters(parameters: string[]) {
    return this.prisma.generalParameters.findMany({
      where: {
        parameter: {
          array_contains: parameters,
        },
      },
    });
  }

  async create(obj: CreateGeneralParametersDto) {
    const { parameter, content, updatedBy } = obj;
    return this.prisma.generalParameters.create({
      data: {
        parameter,
        content,
        updatedBy,
      },
    });
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
          parameter: '',
          updatedBy: 'system', // Adicione um valor padrão ou predefinido aqui
        },
      });
    }
  }
}
