import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { usersDb } from 'src/database/usersDb';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): User {
    const user = usersDb.createUser(createUserDto);
    return this.createUserResponse(user);
  }

  findAll() {
    const users = usersDb.getAllUsers();
    return users.map((user) => this.createUserResponse(user));
  }

  findOne(id: string) {
    const user = usersDb.getUserById(id);
    if (!user) throw new NotFoundException();
    return this.createUserResponse(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = usersDb.getUserById(id);
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();
    const updatedUser = usersDb.updateUser(id, updateUserDto);
    return this.createUserResponse(updatedUser);;
  }

  remove(id: string) {
    const user = usersDb.getUserById(id);
    if (!user) throw new NotFoundException();
    usersDb.deleteUser(id);
  }

  private createUserResponse(user: User): User {
    const userResponse = { ...user };
    delete userResponse['password'];
    return userResponse;
  }
}
