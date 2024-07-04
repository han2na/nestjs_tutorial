import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { Customer } from '../../types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'customers@gmail.com',
      name: 'Ngoc',
    },
    {
      id: 2,
      email: 'cs@gmail.com',
      name: 'Anh',
    },
    {
      id: 3,
      email: 'chamsoc@gmail.com',
      name: 'Hello',
    },
  ];

  getAllCustomer() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
  }
}
