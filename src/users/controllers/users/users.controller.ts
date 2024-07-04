import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';
import { UserNotFoundException } from '../../Exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { AuthenticatedGuard } from '../../../auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE')
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  async getByUsername(@Param('username') username: string) {
    const user = await this.usersService.getuserByUsername(username);
    if (user) return new SerializedUser(user);
    else
      throw new HttpException(
        'AUTH.USER_OR_EMAIL_NOT_CORRECT',
        HttpStatus.BAD_REQUEST,
      );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    if (user) {
      return new SerializedUser(user);
    } else throw new UserNotFoundException('User was not found');
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
