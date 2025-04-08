"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const root_module_1 = require("./module/root.module");
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const error_logging_interceptot_1 = require("./module/common/error-logging.interceptot");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(root_module_1.RootModule, { snapshot: true });
    app.enableCors();
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: 'local',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        enableDebugMessages: true,
        whitelist: true,
    }));
    app.useGlobalInterceptors(new error_logging_interceptot_1.ErrorLoggingInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('ShopNest')
        .setDescription('BY Mi-Tech Inc')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map