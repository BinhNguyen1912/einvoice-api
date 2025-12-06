import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { RequestParams } from '@common/decorators/request-params.decorator';
import { ProcessId } from '@common/decorators/proccessId.decorator';
@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('get-invoice')
  getInvoice(
    @RequestParams() data: string,
    @ProcessId() processId: string
  ): Response<string> {
    console.log('data', data);

    return Response.success<string>(
      `Invoice_${data}_from_process_${processId}`
    );
  }
}
