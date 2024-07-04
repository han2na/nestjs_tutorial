import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 'line1' })
  @IsNotEmpty()
  line1: string;

  @ApiProperty({ example: 'line2' })
  line2?: string;

  @ApiProperty({ example: '000000' })
  @IsNumberString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ example: 'Ha Noi' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'VietNam' })
  @IsNotEmpty()
  state: string;
}
