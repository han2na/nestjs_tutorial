import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConsoleLog } from '../../auth/utils/ConsoleLog';

@Injectable()
export class CustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { valid } = req.headers;
    ConsoleLog('CustomerAccountMiddleware', valid);
    if (valid) next();
    else return res.status(403).send({ error: 'AUTH.ACCOUNT_NOT_VALID' });
  }
}
