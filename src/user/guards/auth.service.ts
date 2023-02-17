import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  ValidateToken(token: string) {
    try {
      this.jwtService.verify(token, { secret: 'secret' });

      return true;
    } catch (error) {
      return error;
    }
  }
}
