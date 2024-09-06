import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: { ...createUserDto } });
  }
  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }
  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
