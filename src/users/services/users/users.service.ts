import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../typeorm';
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getuserByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const password = await encodePassword(createUserDto.password);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password,
    });
    return await this.usersRepository.save(newUser);
  }
}
