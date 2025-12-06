import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { MetadataKeys } from '@common/constants/common.lib';
import { catchError, map } from 'rxjs/operators';
import { ResponseDTO } from '@common/interfaces/gateway/response.interface';
import { HttpMessage } from '@common/constants/enum/http-message.enum';
import { HttpStatusCode } from 'axios';
export class ExceptionInterceptor implements NestInterceptor {
  private logger = new Logger(ExceptionInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request & {
      [MetadataKeys.PROCESS_ID]: string;
      [MetadataKeys.START_TIME]: string;
    } = ctx.getRequest();

    const processId = request[MetadataKeys.PROCESS_ID];
    const startTime = request[MetadataKeys.START_TIME];

    console.log('processId at interceptor', processId);

    return next.handle().pipe(
      map((data: ResponseDTO<unknown>) => {
        const duration = Date.now() - new Date(startTime).getTime();
        data.processId = processId;
        data.duration = `${duration} ms`;
        return data;
      }),
      catchError((err) => {
        this.logger.error({ err });
        const duration = Date.now() - new Date(startTime).getTime();
        const message =
          err.message ||
          err?.response?.message ||
          err ||
          HttpMessage.INTERNAL_SERVER_ERROR;
        const code =
          err.status ||
          err?.response?.statusCode ||
          HttpStatusCode.InternalServerError;
        throw new HttpException(
          new ResponseDTO({
            duration: `${duration} ms`,
            processId,
            message,
            data: null,
            statusCode: code,
          }),
          code
        );
      })
    );
  }
}
