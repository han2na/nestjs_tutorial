import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  getCustomer(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(typeof id);
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ message: 'No Customers Found' });
    }
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('No Customers Found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.getAllCustomer();
  }

  @Post('create')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customersService.createCustomer(createCustomerDto);
  }
}
