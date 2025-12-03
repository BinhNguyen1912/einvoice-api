import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class AppConfiguration {
  @IsNumber()
  @IsNotEmpty({
    message: 'PORT is required',
  })
  @Type(() => Number)
  PORT: number;
  constructor() {
    this.PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3400;
  }
}
