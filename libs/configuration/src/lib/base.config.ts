import { Logger } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';

export class BaseConfiguration {
  @IsString({
    message: 'NODE_ENV must be a string',
  })
  @IsNotEmpty({
    message: 'NODE_ENV is required',
  })
  NODE_ENV: string;
  @IsBoolean({
    message: 'IS_DEV must be a boolean',
  })
  IS_DEV: boolean;
  @IsString({
    message: 'GLOBAL_PREFIX must be a string',
  })
  @IsNotEmpty({
    message: 'GLOBAL_PREFIX is required',
  })
  GLOBAL_PREFIX: string;
  constructor() {
    this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || '';
    this.NODE_ENV = process.env['NODE_ENV'] || 'development';
    this.IS_DEV = process.env['NODE_ENV'] === 'development';
  }

  validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      console.log('[ERROR]', errors);

      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}).join(', '))
        .join('; ');
      Logger.error(`Configuration validation error: ${errorMessages}`);
      throw new Error(`Configuration validation error: ${errorMessages}`);
    }
  }
}
