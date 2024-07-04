import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/services/users/users.service';
import { UserEntity } from '../../typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userSevice: UsersService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
    console.log('serializeUser', __filename);
    done(null, user);
  }

  async deserializeUser(
    user: UserEntity,
    done: (err, user: UserEntity) => void,
  ) {
    console.log('deserializeUser', __filename);

    const userDb = await this.userSevice.getUserById(user.id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
