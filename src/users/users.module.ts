import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
  exports: ['USER_SERVICE'],
})
export class UsersModule {}
