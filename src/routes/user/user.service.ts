import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserResponse } from './entities/user.entity';
import { userDb } from 'src/database/userDb';
import { UUID } from 'src/types/types';

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await userDb.createUser(createUserDto);
      return this.createUserResponse(user);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await userDb.getAllUsers();
    return users.map((user) => this.createUserResponse(user));
  }

  async findOne(id: UUID): Promise<UserResponse> {
    const user = await userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    return this.createUserResponse(user);
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const user = await userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();
    try {
      const { version } = user;
      const updatedUser = await userDb.updateUser(
        id,
        updateUserDto.newPassword,
        version + 1,
      );
      return this.createUserResponse(updatedUser);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID) {
    const user = await userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    userDb.deleteUser(id);
  }

  private createUserResponse(user: User): UserResponse {
    const { id, login, version, createdAt, updatedAt } = user;
    return {
      id,
      login,
      version,
      createdAt: createdAt.valueOf(),
      updatedAt: updatedAt.valueOf(),
    };
  }
}
