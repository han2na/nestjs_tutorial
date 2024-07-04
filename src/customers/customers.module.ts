import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';
import { ConsoleLog } from '../auth/utils/ConsoleLog';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        CustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          ConsoleLog('Last Middleware');
          next();
        },
      )
      .exclude({
        path: 'customers/create',
        method: RequestMethod.POST,
      })
      .forRoutes(CustomersController);
  }
}
