import {
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggingService: LoggingService,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    this.loggingService.error(`HTTP Exception: ${JSON.stringify(message)}`);

    httpAdapter.reply(ctx.getResponse(), message, httpStatus);
  }
}