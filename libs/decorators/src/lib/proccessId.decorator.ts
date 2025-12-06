import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/common.lib';
import { getProcessId } from '@common/utils/string.util';
export const ProcessId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request of Meta ProcessId', request[MetadataKeys.PROCESS_ID]);

    return request[MetadataKeys.PROCESS_ID] ?? getProcessId();
  }
);
