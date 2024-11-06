import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userDb } from 'src/database/userDb';
import { UUID } from 'src/types/types';

@Injectable()
export class userService {
  create(createUserDto: CreateUserDto): User {
    const user = userDb.createUser(createUserDto);
    return this.createUserResponse(user);
  }

  findAll() {
    const users = userDb.getAllUsers();
    return users.map((user) => this.createUserResponse(user));
  }

  findOne(id: UUID) {
    const user = userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    return this.createUserResponse(user);
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    const user = userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();
    const updatedUser = userDb.updateUser(id, updateUserDto);
    return this.createUserResponse(updatedUser);;
  }

  remove(id: UUID) {
    const user = userDb.getUserById(id);
    if (!user) throw new NotFoundException();
    userDb.deleteUser(id);
  }

  private createUserResponse(user: User): User {
    const userResponse = { ...user };
    delete userResponse['password'];
    return userResponse;
  }
}
