import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePasswords } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('validateUser', __filename);
    const userDb = await this.userService.getuserByUsername(username);
    if (!userDb) {
      return null;
    }

    const matched = comparePasswords(password, userDb.password);
    if (!matched) {
      return null;
    }

    return userDb;
  }
}
