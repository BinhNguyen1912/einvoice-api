import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from '@common/interfaces/gateway/response.interface';
import { ProcessId } from '@common/decorators/proccessId.decorator';
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const resuft = this.appService.getData();
    throw new BadRequestException('Ahihi do ngo');
    return new ResponseDTO({ data: resuft });
  }

  @Get('invoice')
  async getInvoice(@ProcessId() processId: string) {
    const invoice = await this.appService.getInvoiceProxy(processId);
    console.log('invoice', invoice);

    return new ResponseDTO({ data: invoice });
  }
}
