import { HttpMessage } from '@common/constants/enum/http-message.enum';
import { HttpStatus } from '@nestjs/common';

export class Response<T> {
  code: string;
  data?: T;
  error?: string;
  statusCode: number;

  constructor(partial: Partial<Response<T>>) {
    this.code = partial.code ?? HttpMessage.OK;
    this.data = partial.data;
    this.error = partial.error;
    this.statusCode = partial.statusCode ?? HttpStatus.OK;
  }

  static success<T>(data: T): Response<T> {
    return new Response<T>({ data });
  }
}
export type ResponseType<T> = Response<T>;
