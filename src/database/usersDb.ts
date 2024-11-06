import { CreateUserDto } from "src/rotes/users/dto/create-user.dto";
import { UpdateUserDto } from "src/rotes/users/dto/update-user.dto";
import { User } from "src/rotes/users/entities/user.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';

export class UsersDb {
  private users: User[] = [];

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: UUID): User {
    return this.users.find((user) => user.id === id);
  }

  public createUser(dto: CreateUserDto): User {
    const timeNow = Date.now();
    const user: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: timeNow,
      updatedAt: timeNow,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(id: UUID, dto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    const updatedUser: User = {
      ...user,
      version: user.version + 1,
      password: dto.newPassword,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) =>
      user.id !== id ? user : updatedUser,
    );
    return updatedUser;
  }

  public deleteUser(id: UUID) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export const usersDb = new UsersDb();