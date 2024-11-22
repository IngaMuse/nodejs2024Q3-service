import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';
import { User } from 'src/routes/user/entities/user.entity';
import { UUID } from 'src/types/types';
import { PrismaService } from 'src/routes/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDb {
  constructor(private prisma: PrismaService) {}

  public async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async getUserById(id: UUID): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { login } });
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
  }

  public async updateUser(
    id: UUID,
    password: string,
    version: number,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { password, version },
    });
  }

  public async deleteUser(id: UUID): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export const userDb = new UserDb(new PrismaService());
