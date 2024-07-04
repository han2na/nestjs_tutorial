import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConsoleLog } from '../../auth/utils/ConsoleLog';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    ConsoleLog('ValidateCustomerMiddleware', authorization);
    if (!authorization) {
      return res.status(403).send({ error: 'Unauthorized' });
    }
    if (authorization == 'Bearer 123') next();
    else return res.status(403).send({ error: 'Unauthorized' });
  }
}
