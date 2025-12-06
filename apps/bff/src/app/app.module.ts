import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION } from '../configuration';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TCP_SERVICES, TcpProvider } from '@commom/configuration/tcp.config';
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [() => CONFIGURATION],
//     }),
//     //
//     ClientsModule.register([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)]),
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     LoggerMiddleware,
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: ExceptionInterceptor,
//     },
//   ],
//   exports: [
//     ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)]),
//   ],
// })
// export class AppModule implements NestModule {
//   static CONFIGURATION = CONFIGURATION;
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),

    ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.INVOICE_SERVICE)]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerMiddleware,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
  // BƯỚC 2: EXPORT CLIENT PROXY RA NGOÀI ĐỂ APP SERVICE CÓ THỂ TIÊM ĐƯỢC
  exports: [
    // CHỈ EXPORT LỚP ClientsModule. NestJS sẽ hiểu rằng nó cần xuất các providers
    // đã được định nghĩa bên trong nó (INVOICE_SERVICE)
    ClientsModule,
  ],
})
export class AppModule implements NestModule {
  static CONFIGURATION = CONFIGURATION;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
