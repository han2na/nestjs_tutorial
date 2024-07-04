import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1', type: 'string' })
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'ngocanh' })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto;
}
