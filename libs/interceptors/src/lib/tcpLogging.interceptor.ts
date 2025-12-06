import { MetadataKeys } from '@common/constants/common.lib';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    console.log(context.getType());

    // 1. Kiểm tra nếu KHÔNG phải là RPC (ví dụ là HTTP) thì bỏ qua logic log này
    // để tránh lỗi khi cố gắng đọc params của HTTP Request
    if (context.getType() !== 'rpc') {
      return next.handle();
    }
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    const handler = context.getHandler();
    const method = handler.name;

    // 2. Dùng switchToRpc() để lấy data chuẩn xác hơn
    const ctx = context.switchToRpc();
    const data = ctx.getData(); // Đây chính là payload gửi lên

    // Lấy processId an toàn
    const processId = data?.processId || 'UNDEFINED';
    (req as any)[MetadataKeys.PROCESS_ID] = processId;
    // 3. Stringify an toàn (đề phòng data bị circular structure)
    let stringifiedParams = '';
    try {
      stringifiedParams = JSON.stringify(data);
    } catch (e) {
      stringifiedParams = '[Circular or Non-serializable Data]';
    }

    Logger.log(
      `[TCP LOG START] ProcessId: ${processId} - Method: ${method} - Params: ${stringifiedParams} - Time: ${new Date().toISOString()}`,
      'TcpLoggingInterceptor'
    );

    return next.handle().pipe(
      tap({
        next: () => {
          Logger.log(
            `[TCP LOG END] ProcessId: ${processId} - Method: ${method} - Completed in ${
              Date.now() - now
            }ms`,
            'TcpLoggingInterceptor'
          );
        },
        error: (err) => {
          Logger.error(
            `[TCP LOG ERROR] ProcessId: ${processId} - Method: ${method} - Failed in ${
              Date.now() - now
            }ms. Error: ${err.message}`,
            err.stack,
            'TcpLoggingInterceptor'
          );
        },
      })
    );
  }
}
