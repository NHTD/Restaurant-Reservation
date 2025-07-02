
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/common/dto/response/api-response';
import { UserWithoutPassword } from 'src/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserWithoutPassword> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      const response = ApiResponse.error("Email or password is not correct", "Failed", HttpStatus.UNAUTHORIZED)
      throw new HttpException(response, HttpStatus.UNAUTHORIZED)
    }
    return user;
  }
}
