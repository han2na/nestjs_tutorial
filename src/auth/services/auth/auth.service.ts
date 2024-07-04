import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePasswords } from '../../../utils/bcrypt';
import { ConsoleLog } from '../../utils/ConsoleLog';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    ConsoleLog('validateUser');
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
