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
          console.log('Last Middleware', __filename);
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
