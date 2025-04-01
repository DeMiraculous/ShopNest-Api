import { NestFactory } from '@nestjs/core';
import { RootModule } from './module/root.module';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ErrorLoggingInterceptor } from './common/error-logging.interceptot';


async function bootstrap() {
  const app = await NestFactory.create(RootModule, { snapshot: true });
  await app.listen(process.env.PORT ?? 3000);

  // Enable CORS for all requests.
  app.enableCors();

    // Setup Sentry for error reporting.
    Sentry.init({
      // @Todo use env variables for this
      dsn: process.env.SENTRY_DSN,
      environment: 'local',
    });

  // Ensure that all incoming requests are validated against the DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      whitelist: true, // Strip out any properties that are not defined in the DTO.
    }),
  );

  // for handling and logging errors throughout the application. it add more info about the errors returned by the API.
  app.useGlobalInterceptors(new ErrorLoggingInterceptor());
}
bootstrap();
