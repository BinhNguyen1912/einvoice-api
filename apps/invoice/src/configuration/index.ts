import { BaseConfiguration } from '@commom/configuration/base.config';
import { AppConfiguration } from '@commom/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@commom/configuration/tcp.config';
export class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG: AppConfiguration;

  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV: TcpConfiguration;
  constructor() {
    super();
    this.APP_CONFIG = new AppConfiguration();
    this.TCP_SERV = new TcpConfiguration();
  }
}
export const CONFIGURATION = new Configuration();
export type IConfiguration = typeof CONFIGURATION;
CONFIGURATION.validate();
