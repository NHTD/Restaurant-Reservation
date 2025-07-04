import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'authorization, content-type, xsrf-token');
    res.header('Access-Control-Expose-Headers', 'xsrf-token');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  }
}
