import { NestFactory, Reflector } from '@nestjs/core';
import { RootModule } from './module/root.module';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ErrorLoggingInterceptor } from './module/common/error-logging.interceptot';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './module/auth/roles.guard';
import { AuthGuard } from './module/auth/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(RootModule, { snapshot: true });

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

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('ShopNest')
    .setDescription('BY Mi-Tech Inc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
