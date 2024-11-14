import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  @Exclude()
  password: string;
}

export interface UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
