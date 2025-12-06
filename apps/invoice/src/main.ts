/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  /*
- Đoạn mã này tạo ra một ứng dụng NestJS hoạt động đồng thời hai vai trò:
HTTP Gateway/API: Lắng nghe yêu cầu HTTP (REST) trên cổng 3000 (với tiền tố /api).
TCP Microservice: Lắng nghe các yêu cầu TCP (dành cho giao tiếp nội bộ dịch vụ-với-dịch vụ) trên cổng 3401.*/
  const app = await NestFactory.create(AppModule);
  console.log(
    AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.host
  );
  console.log(
    AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.port
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.host,
      port: AppModule.CONFIGURATION.TCP_SERV.TCP_INVOICE_SERVICE.options.port,
    },
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.INVOICE_SERVICE_PORT;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
