import { Inject, Injectable } from '@nestjs/common';
import { port } from '@common/constants/common.lib';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map, pipe } from 'rxjs';
import { TCP_SERVICES } from '@commom/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { ResponseDTO } from '@common/interfaces/gateway/response.interface';
import { HttpMessage } from '@common/constants/enum/http-message.enum';
@Injectable()
export class AppService {
  constructor(
    @Inject(TCP_SERVICES.INVOICE_SERVICE)
    private readonly clientProxy: ClientProxy & TcpClient
  ) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  async getInvoiceProxy(processId: string) {
    const observable = this.clientProxy
      .send<string, number>('get-invoice', {
        processId,
        data: 1,
      })
      .pipe(
        map((invoiceResponse) => {
          return invoiceResponse.data;
          //  data: invoiceResponse.data,
        })
      );
    return await firstValueFrom(observable);
  }
}
