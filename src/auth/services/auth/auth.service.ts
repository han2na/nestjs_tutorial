import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('Inside', __filename.split('dist')[1]);
    const userDb = await this.userService.getuserByUsername(username);

    if (userDb && userDb.password === password) return userDb;
    throw new UnauthorizedException();
  }
}
