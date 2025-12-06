import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getProcessId } from '@common/utils/string.util';
import { MetadataKeys } from '@common/constants/common.lib';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const now = Date.now();

    const { body, originalUrl, method } = req;

    const processId = getProcessId();

    (req as any)[MetadataKeys.PROCESS_ID] = processId;
    (req as any)[MetadataKeys.START_TIME] = startTime;

    Logger.log(
      `[HTTP]-[${processId}] - [${method} ${originalUrl}] - Body: ${JSON.stringify(
        body
      )} - StartTime: ${new Date(now).toISOString()}`
    );

    const originalSent = res.send.bind(res);

    res.send = function (body?: any) {
      const durationMs = Date.now() - startTime;
      Logger.log(
        `[HTTP]-[${processId}] - [${method} ${originalUrl}] - Status: ${res.statusCode} - Duration: ${durationMs}ms`
      );
      return originalSent(body);
    };

    next();
  }
}
