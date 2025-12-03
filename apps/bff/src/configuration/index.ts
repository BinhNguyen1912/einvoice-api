import { BaseConfiguration } from '@commom/configuration/base.config';
import { AppConfiguration } from '@commom/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG: AppConfiguration;
  constructor() {
    super();
    this.APP_CONFIG = new AppConfiguration();
  }
}
export const CONFIGURATION = new Configuration();
export type IConfiguration = typeof CONFIGURATION;
CONFIGURATION.validate();
