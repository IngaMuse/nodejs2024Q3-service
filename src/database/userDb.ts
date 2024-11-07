import { CreateUserDto } from "src/routes/user/dto/create-user.dto";
import { UpdateUserDto } from "src/routes/user/dto/update-user.dto";
import { User } from "src/routes/user/entities/user.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';
import { DB, db } from "./db";

export class UserDb {
  constructor(private readonly db: DB) {}
  public getAllUsers(): User[] {
    return this.db.users;
  }

  public getUserById(id: UUID): User {
    return this.db.users.find((user) => user.id === id);
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
    this.db.users.push(user);
    return user;
  }

  public updateUser(id: UUID, dto: UpdateUserDto) {
    const user = this.db.users.find((user) => user.id === id);
    const updatedUser: User = {
      ...user,
      version: user.version + 1,
      password: dto.newPassword,
      updatedAt: Date.now(),
    };

    this.db.users = this.db.users.map((user) =>
      user.id !== id ? user : updatedUser,
    );
    return updatedUser;
  }

  public deleteUser(id: UUID) {
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}

export const userDb = new UserDb(db);