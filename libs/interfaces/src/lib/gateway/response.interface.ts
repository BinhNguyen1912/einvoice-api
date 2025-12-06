import { HttpMessage } from '@common/constants/enum/http-message.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class ResponseDTO<T> {
  @ApiProperty({ type: 'string' })
  message = HttpMessage.OK;
  @ApiProperty()
  data?: T;
  @ApiProperty()
  processId?: string;
  @ApiProperty({ type: 'number' })
  statusCode = HttpStatus.OK;

  @ApiProperty()
  duration?: string;

  constructor(data: Partial<ResponseDTO<T>>) {
    Object.assign(this, data);
  }
}
