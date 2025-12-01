import { Injectable } from '@nestjs/common';
import { port } from '@common/constants/common.lib';
@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log('port', port);

    return { message: 'Hello API' };
  }
}
