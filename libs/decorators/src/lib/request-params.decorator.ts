import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestParams = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    console.log('req.data', req.data);
    console.log(req.processId);

    if (!data) return req.data;
    return req.data[data];
  }
);
