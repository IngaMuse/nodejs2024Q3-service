import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;
  @Transform(({ value }) => new Date(value).getTime())
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
