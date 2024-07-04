import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @ApiProperty({ example: 'email@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password@123' })
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
