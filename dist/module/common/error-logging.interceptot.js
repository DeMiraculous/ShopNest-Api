"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorLoggingInterceptor = class ErrorLoggingInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((exception) => {
            console.log(exception);
            const request = context.switchToHttp().getRequest();
            return (0, rxjs_1.throwError)(() => {
                if (exception instanceof common_1.BadRequestException) {
                    return new common_1.HttpException({
                        statusCode: exception?.getStatus(),
                        message: 'Bad Request Exception',
                        validationErrors: exception.getResponse()?.message ||
                            'Invalid request data provided',
                        timestamp: new Date().toISOString(),
                        route: request.path,
                        method: request.method,
                    }, exception?.getStatus());
                }
                else {
                    let message = exception?.message ||
                        exception?.detail ||
                        'Something went wrong';
                    if (!exception.status || exception.status === 500) {
                        message = 'Something went wrong';
                        if (process.env.NODE_ENV === 'development') {
                            console.log(exception);
                        }
                        Sentry.captureException(exception, (scope) => {
                            scope.setExtra('request', {
                                url: request.url,
                                body: JSON.stringify(request.body),
                                headers: request.headers,
                            });
                            return scope;
                        });
                    }
                    return new common_1.HttpException({
                        statusCode: exception?.status,
                        message,
                        timestamp: new Date().toISOString(),
                        route: request.path,
                        method: request.method,
                    }, exception?.status || 500);
                }
            });
        }));
    }
};
exports.ErrorLoggingInterceptor = ErrorLoggingInterceptor;
exports.ErrorLoggingInterceptor = ErrorLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorLoggingInterceptor);
//# sourceMappingURL=error-logging.interceptot.js.map