import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yamljs from 'yamljs';
import { LoggingService } from './logging/logging.service';
import { CatchEverythingFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new CatchEverythingFilter(app.get(HttpAdapterHost), loggingService),
  );
  const document: OpenAPIObject = yamljs.load('./doc/api.yaml');
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);

  loggingService.log(`Server started at port ${port}`);

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`);
  });
  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection: ${reason}`);
  });
}
bootstrap();
