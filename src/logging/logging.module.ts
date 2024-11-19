import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  exports: [LoggingService],
  providers: [LoggingService],
})
export class LoggingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}