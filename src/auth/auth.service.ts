import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/routes/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(login: string, password: string): Promise<any> {
    
  }

  async login(login: string, password: string): Promise<any> {
    
  }

  async refresh(token: string): Promise<any> {
    
  }


}
