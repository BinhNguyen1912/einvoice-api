import { Request } from './request.interface';
import { Response } from './response.interface';
import { Observable } from 'rxjs';
export interface TcpClient {
  send<TResult = any, TInput = any>(
    pattern: any,
    data: Request<TInput>
  ): Observable<Response<TResult>>;
  emit<TResult = any, TInput = any>(
    pattern: any,
    data: Request<TInput>
  ): Observable<Response<TResult>>;
}
